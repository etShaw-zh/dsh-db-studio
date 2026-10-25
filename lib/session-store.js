/**
 * Per-conversation database selection and global usage tracking.
 *
 * The chat's database picker, the conversation "数据库" tab and the status
 * strip must agree on one answer per Session, and the model-facing tools must
 * see the same answer. That answer lives here, on the host, keyed by Session
 * id: the browser fetches it over the plugin route and the tools read it from
 * their execution context.
 *
 * Two things are persisted:
 *
 *   - `sessions[sessionId].ids` — the databases this conversation may touch.
 *   - `usage[connectionId]` — when (and in which workspace `cwd`) a connection
 *     was last used, so a new conversation can default to the connections
 *     recently used in its workspace.
 *
 * The file is private (`0700` directory, `0600` file), like the connection
 * store.
 *
 * @module dsh-db-studio/session-store
 */

import { randomUUID } from 'node:crypto'
import { chmod, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { studioHome } from './home.js'

const FILE_MODE = 0o600
const DIR_MODE = 0o700
const MAX_SESSIONS = 200
const MAX_HISTORY = 100
const SAVE_DELAY_MS = 400

/** Empty state document. */
function emptyState() {
  return { version: 2, sessions: {}, usage: {}, history: {} }
}

/** Keep only the newest N sessions. */
function pruneSessions(sessions) {
  const rows = Object.entries(sessions)
  if (rows.length <= MAX_SESSIONS) return sessions
  rows.sort((left, right) => (right[1]?.updatedAt ?? 0) - (left[1]?.updatedAt ?? 0))
  return Object.fromEntries(rows.slice(0, MAX_SESSIONS))
}

/** Keep only the newest N history rows per Session. */
function pruneHistory(history) {
  const rows = Object.entries(history)
  if (rows.length <= MAX_SESSIONS) return history
  rows.sort((left, right) => (right[1]?.[0]?.at ?? 0) - (left[1]?.[0]?.at ?? 0))
  return Object.fromEntries(rows.slice(0, MAX_SESSIONS))
}

/** Normalize one stored entry. */
function normalizeEntry(entry) {
  return {
    ids: Array.isArray(entry?.ids) ? entry.ids.filter((id) => typeof id === 'string') : [],
    cwd: typeof entry?.cwd === 'string' ? entry.cwd : undefined,
    updatedAt: Number.isFinite(entry?.updatedAt) ? entry.updatedAt : Date.now(),
  }
}

export class SessionSelectionStore {
  constructor(home) {
    this.home = home
    this.dir = studioHome(home)
    this.file = join(this.dir, 'sessions.json')
    this.state = emptyState()
    this.loaded = false
    this.saveTimer = null
    this.saveQueue = Promise.resolve()
  }

  /** Read the store once. A missing or malformed file is an empty store. */
  async load() {
    if (this.loaded) return this
    this.loaded = true
    try {
      const raw = await readFile(this.file, 'utf8')
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        this.state = {
          version: 2,
          sessions: parsed.sessions && typeof parsed.sessions === 'object' ? parsed.sessions : {},
          usage: parsed.usage && typeof parsed.usage === 'object' ? parsed.usage : {},
          history: parsed.history && typeof parsed.history === 'object' ? parsed.history : {},
        }
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        console.warn('dsh-db-studio: ignoring unreadable session store —', error?.message ?? error)
      }
    }
    return this
  }

  /** Serialized atomic write. */
  async save() {
    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer)
      this.saveTimer = null
    }
    this.saveQueue = this.saveQueue.catch(() => {}).then(async () => {
      await mkdir(this.dir, { recursive: true, mode: DIR_MODE })
      this.state.sessions = pruneSessions(this.state.sessions)
      this.state.history = pruneHistory(this.state.history)
      const body = JSON.stringify(this.state, null, 2) + '\n'
      const temp = `${this.file}.${process.pid}.${Date.now()}.tmp`
      await writeFile(temp, body, { mode: FILE_MODE })
      await rename(temp, this.file)
      await chmod(this.file, FILE_MODE).catch(() => {})
    })
    return this.saveQueue
  }

  /** Coalesce usage writes; selections save immediately. */
  #soon() {
    if (this.saveTimer !== null) return
    this.saveTimer = setTimeout(() => {
      this.saveTimer = null
      this.save().catch(() => {})
    }, SAVE_DELAY_MS)
    if (typeof this.saveTimer.unref === 'function') this.saveTimer.unref()
  }

  /** Resolve the stored entry without creating one. */
  #entry(sessionId) {
    return this.state.sessions[sessionId]
  }

  /** Has this Session an explicit/default selection yet? */
  has(sessionId) {
    return this.#entry(sessionId) !== undefined
  }

  /**
   * Ensure a Session has a selection.
   *
   * Default ("最近使用的连接，工作区内优先"): every connection used in this
   * session's workspace, newest first; if none, every connection ever used;
   * if nothing has ever been used, every configured connection (so the demo
   * database is selected out of the box).
   *
   * The computed default is persisted, which makes the picker, tab and tools
   * agree even before the user opens the picker.
   */
  async ensure(sessionId, connections, cwd) {
    if (!sessionId) throw new Error('缺少会话 id / missing session id')
    await this.load()
    const existing = this.#entry(sessionId)
    if (existing) {
      const entry = normalizeEntry(existing)
      entry.ids = entry.ids.filter((id) => connections.some((connection) => connection.id === id))
      this.state.sessions[sessionId] = entry
      return entry.ids
    }
    const usable = connections.filter((connection) => connection && typeof connection.id === 'string')
    const usage = this.state.usage
    const inWorkspace = cwd
      ? usable
        .filter((connection) => usage[connection.id]?.cwd === cwd)
        .sort((left, right) => (usage[right.id]?.at ?? 0) - (usage[left.id]?.at ?? 0))
      : []
    const everUsed = usable
      .filter((connection) => usage[connection.id]?.at)
      .sort((left, right) => (usage[right.id]?.at ?? 0) - (usage[left.id]?.at ?? 0))
    const defaults = inWorkspace.length ? inWorkspace : everUsed.length ? everUsed : usable
    const ids = defaults.map((connection) => connection.id)
    this.state.sessions[sessionId] = { ids, cwd, updatedAt: Date.now() }
    await this.save()
    return ids
  }

  /** Replace a Session's selection. Empty is a valid, explicit choice. */
  async set(sessionId, ids, cwd) {
    await this.load()
    const unique = [...new Set((Array.isArray(ids) ? ids : []).filter((id) => typeof id === 'string'))]
    this.state.sessions[sessionId] = {
      ids: unique,
      cwd,
      updatedAt: Date.now(),
    }
    await this.save()
    return unique
  }

  /** Record that a connection was used, for future default selections. */
  touch(connectionId, { sessionId, cwd } = {}) {
    if (!connectionId) return
    this.state.usage[connectionId] = {
      at: Date.now(),
      ...(cwd ? { cwd } : {}),
      ...(sessionId ? { sessionId } : {}),
    }
    this.#soon()
  }

  /** A connection was removed: drop it from every selection and usage row. */
  async removeConnection(connectionId) {
    await this.load()
    delete this.state.usage[connectionId]
    let changed = false
    for (const entry of Object.values(this.state.sessions)) {
      const ids = normalizeEntry(entry).ids
      if (ids.includes(connectionId)) {
        entry.ids = ids.filter((id) => id !== connectionId)
        entry.updatedAt = Date.now()
        changed = true
      }
    }
    if (changed) await this.save()
    else this.#soon()
  }

  /** Selected ids for a Session, or [] when none. */
  async selected(sessionId) {
    await this.load()
    return normalizeEntry(this.#entry(sessionId)).ids
  }

  /** Append one SQL run to a Session's history (newest first, bounded). */
  async addHistory(sessionId, entry) {
    if (!sessionId) return null
    await this.load()
    const record = {
      id: randomUUID(),
      at: Date.now(),
      ...entry,
    }
    const rows = Array.isArray(this.state.history[sessionId]) ? this.state.history[sessionId] : []
    rows.unshift(record)
    this.state.history[sessionId] = rows.slice(0, MAX_HISTORY)
    await this.save()
    return record
  }

  /** Every Session's SQL history, newest activity first. */
  async allHistory() {
    await this.load()
    const groups = []
    for (const [sessionId, entries] of Object.entries(this.state.history)) {
      if (!Array.isArray(entries) || entries.length === 0) continue
      const session = normalizeEntry(this.state.sessions[sessionId])
      groups.push({
        sessionId,
        cwd: session.cwd ?? null,
        sessionUpdatedAt: session.updatedAt,
        entries,
      })
    }
    groups.sort((left, right) => (right.entries[0]?.at ?? 0) - (left.entries[0]?.at ?? 0))
    return groups
  }

  /** One Session's SQL history, newest first. */
  async history(sessionId) {
    await this.load()
    const rows = this.state.history[sessionId]
    return Array.isArray(rows) ? rows.slice() : []
  }

  /** Clear one Session's SQL history. */
  async clearHistory(sessionId) {
    await this.load()
    if (!this.state.history[sessionId]) return false
    delete this.state.history[sessionId]
    await this.save()
    return true
  }

  /** All usage rows (tests/debug). */
  usageSnapshot() {
    return { ...this.state.usage }
  }

  /** Flush pending usage writes. */
  async flush() {
    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer)
      this.saveTimer = null
    }
    await this.save()
  }
}
