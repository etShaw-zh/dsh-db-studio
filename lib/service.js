/**
 * DatabaseStudio — the headless half of dsh-db-studio.
 *
 * Owns the connection store, one cached adapter per connection, the demo
 * database, and the operation vocabulary shared by the HTTP route and the
 * agent tools. Nothing here imports Cordis, so the whole service is testable in
 * a plain Node process.
 *
 * @module dsh-db-studio/service
 */

import { chmod, mkdir, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { isSingleStatement, openConnection } from './drivers.js'
import { resolveDshHome, studioHome } from './home.js'
import { ConnectionStore, connectionTarget, normalizeConnection, publicConnection } from './store.js'
import { SessionSelectionStore } from './session-store.js'

const DEMO_ID = 'demo'
const DEMO_NAME = '示例数据库'
const ADAPTER_IDLE_MS = 5 * 60 * 1000

export const DEFAULT_CONFIG = {
  demo: true,
  allowWrite: true,
  agentTools: true,
  maxRows: 200,
}

/** Clamp a user-supplied row limit into the configured window. */
function clampLimit(value, fallback, max) {
  const n = Number.isFinite(Number(value)) ? Math.floor(Number(value)) : fallback
  return Math.min(Math.max(n, 1), max)
}

/** Display the default harness home symbolically in the sidebar. */
function displayHome(home) {
  const usual = join(homedir(), '.dsh')
  return home === usual ? '~/.dsh' : home
}

/** Check whether an optional driver package can be imported. */
async function driverAvailable(name) {
  try {
    await import(name)
    return true
  } catch {
    return false
  }
}

/** The seed script for the demo database. */
const DEMO_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  vip INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);
INSERT INTO users (id, name, email, city, vip, created_at) VALUES
  (1, '林小雨', 'xiaoyu.lin@example.com', '杭州', 1, '2026-01-12 09:20:00'),
  (2, '陈默', 'mo.chen@example.com', '上海', 0, '2026-02-03 14:05:00'),
  (3, '苏晚', 'wan.su@example.com', '北京', 1, '2026-02-18 18:41:00'),
  (4, '周野', 'ye.zhou@example.com', '成都', 0, '2026-03-02 11:10:00'),
  (5, '顾清', 'qing.gu@example.com', '深圳', 1, '2026-03-21 08:55:00'),
  (6, '沈舟', 'zhou.shen@example.com', '南京', 0, '2026-04-09 16:30:00'),
  (7, '许知意', 'zhiyi.xu@example.com', '武汉', 0, '2026-05-17 10:15:00'),
  (8, '江屿', 'yu.jiang@example.com', '厦门', 1, '2026-06-08 21:00:00');
INSERT INTO products (id, name, category, price, stock) VALUES
  (1, '手冲咖啡豆 · 耶加雪菲', '咖啡', 128.0, 42),
  (2, '冷萃咖啡液', '咖啡', 69.0, 120),
  (3, '陶瓷马克杯', '器物', 89.0, 35),
  (4, '桌面收纳盒', '器物', 159.0, 18),
  (5, '机械键盘 · 青轴', '数码', 399.0, 12),
  (6, '无线鼠标', '数码', 229.0, 24),
  (7, '雪山香薰蜡烛', '香氛', 118.0, 48),
  (8, '旅行帆布包', '出行', 199.0, 30);
INSERT INTO orders (id, user_id, product_id, quantity, total, status, created_at) VALUES
  (1, 1, 1, 2, 256.0, 'completed', '2026-07-02 10:12:00'),
  (2, 2, 3, 1, 89.0, 'completed', '2026-07-05 15:44:00'),
  (3, 3, 5, 1, 399.0, 'completed', '2026-07-09 09:03:00'),
  (4, 1, 7, 1, 118.0, 'completed', '2026-07-15 20:21:00'),
  (5, 4, 2, 3, 207.0, 'completed', '2026-07-21 13:38:00'),
  (6, 5, 6, 1, 229.0, 'paid', '2026-08-01 11:07:00'),
  (7, 6, 4, 1, 159.0, 'paid', '2026-08-06 17:52:00'),
  (8, 7, 8, 1, 199.0, 'paid', '2026-08-14 08:26:00'),
  (9, 8, 1, 1, 128.0, 'completed', '2026-08-20 19:45:00'),
  (10, 3, 2, 2, 138.0, 'cancelled', '2026-08-24 12:11:00'),
  (11, 5, 7, 2, 236.0, 'completed', '2026-09-02 16:02:00'),
  (12, 2, 8, 1, 199.0, 'paid', '2026-09-09 10:33:00'),
  (13, 6, 1, 2, 256.0, 'completed', '2026-09-15 21:18:00'),
  (14, 4, 6, 1, 229.0, 'paid', '2026-09-23 14:50:00'),
  (15, 7, 3, 2, 178.0, 'completed', '2026-10-01 09:41:00'),
  (16, 8, 4, 1, 159.0, 'paid', '2026-10-06 18:07:00'),
  (17, 1, 8, 1, 199.0, 'completed', '2026-10-12 13:22:00'),
  (18, 3, 1, 3, 384.0, 'paid', '2026-10-17 11:56:00');
`

export class DatabaseStudio {
  constructor(options = {}) {
    this.config = { ...DEFAULT_CONFIG, ...(options.config ?? {}) }
    this.home = resolveDshHome(options.dshHome, options.env ?? process.env)
    this.dir = studioHome(this.home)
    this.demoFile = join(this.dir, 'demo.db')
    this.store = new ConnectionStore(this.home)
    this.selections = new SessionSelectionStore(this.home)
    this.adapters = new Map()
    this.writeQueues = new Map()
    this.initPromise = null
    this.driverCache = null
  }

  /** Load the store and seed the demo connection on first use. */
  ready() {
    this.initPromise ??= this.#init()
    return this.initPromise
  }

  async #init() {
    await mkdir(this.dir, { recursive: true, mode: 0o700 })
    // Tighten an existing demo file too: older builds let node:sqlite create it
    // with the process umask.
    await chmod(this.demoFile, 0o600).catch(() => {})
    await this.store.load()
    await this.selections.load()
    if (this.config.demo && this.store.list().length === 0) {
      try {
        await this.#ensureDemo()
      } catch (error) {
        console.warn('dsh-db-studio: demo database could not be created —', error?.message ?? error)
      }
    }
  }

  /** Create and seed the demo SQLite database, then register its connection. */
  async #ensureDemo() {
    await mkdir(this.dir, { recursive: true, mode: 0o700 })
    let exists = false
    try {
      exists = (await stat(this.demoFile)).isFile()
    } catch {
      exists = false
    }
    const db = new DatabaseSync(this.demoFile)
    try {
      const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('users','products','orders')").all()
      if (!exists || tables.length < 3) db.exec(DEMO_SQL)
    } finally {
      db.close()
    }
    // Node's SQLite creates the file with the process umask. The demo may hold
    // sample rows a user asked to keep, so give it the same private mode as the
    // connection store.
    await chmod(this.demoFile, 0o600).catch(() => {})
    await this.store.replaceAll([
      {
        id: DEMO_ID,
        name: DEMO_NAME,
        kind: 'sqlite',
        file: this.demoFile,
        readOnly: false,
        demo: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }

  /** The browser-safe overview the panel and the list tool return. */
  async overview() {
    await this.ready()
    this.driverCache ??= Promise.all([
      driverAvailable('pg'),
      driverAvailable('mysql2'),
    ]).then(([postgres, mysql]) => ({ sqlite: true, postgres, mysql }))
    return {
      connections: this.store.list(),
      drivers: await this.driverCache,
      home: displayHome(this.home),
      demoFile: this.demoFile,
      allowWrite: this.config.allowWrite !== false,
      config: { demo: this.config.demo !== false, maxRows: this.config.maxRows },
    }
  }

  /** The store, loaded. */
  async connection(id) {
    await this.ready()
    const connection = id ? this.store.get(id) : this.store.first()
    if (!connection) {
      if (this.store.list().length === 0) throw new Error('还没有数据库连接，请先在「数据库」面板新建连接 / no database connection configured')
      throw new Error('连接不存在 / connection not found')
    }
    return connection
  }

  async listConnections() {
    return this.overview()
  }

  /**
   * The per-conversation state shared by the picker, the conversation tab and
   * the status strip. `ensure()` supplies the default selection (recently used
   * connections in the Session's workspace) the first time a Session asks.
   */
  async sessionState(sessionId, cwd) {
    await this.ready()
    if (!sessionId) throw new Error('缺少会话 id / missing session id')
    const connections = this.store.list()
    const selectedIds = await this.selections.ensure(sessionId, connections, cwd)
    const selected = selectedIds
      .map((id) => connections.find((connection) => connection.id === id))
      .filter(Boolean)
    return { sessionId, cwd: cwd ?? null, selectedIds, selected, connections }
  }

  /** Replace one Session's selection (empty is valid). */
  async setSessionSelection(sessionId, ids, cwd) {
    await this.ready()
    if (!sessionId) throw new Error('缺少会话 id / missing session id')
    const valid = new Set(this.store.list().map((connection) => connection.id))
    const chosen = (Array.isArray(ids) ? ids : []).filter((id) => valid.has(id))
    await this.selections.set(sessionId, chosen, cwd)
    return this.sessionState(sessionId, cwd)
  }

  /** Ping every selected connection and report table counts for the status strip. */
  async sessionStatus(sessionId, cwd) {
    const state = await this.sessionState(sessionId, cwd)
    const rows = await Promise.all(state.selected.map(async (publicRow) => {
      const connection = this.store.get(publicRow.id)
      if (!connection) return { ...publicRow, ok: false, error: '连接不存在 / connection not found' }
      const started = Date.now()
      let timer = null
      try {
        const adapter = await this.#adapter(connection)
        const timeout = new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('连接超时 / connection timed out')), 6000)
        })
        const tables = await Promise.race([adapter.listTables(), timeout])
        return {
          ...publicRow,
          ok: true,
          latencyMs: Date.now() - started,
          tableCount: Array.isArray(tables) ? tables.length : 0,
        }
      } catch (error) {
        // Drop a failed adapter so the next status check reconnects. Without
        // this a pool refused at startup would keep failing forever.
        await this.closeAdapter(connection.id).catch(() => {})
        return { ...publicRow, ok: false, latencyMs: Date.now() - started, error: error?.message ?? String(error) }
      } finally {
        if (timer !== null) clearTimeout(timer)
      }
    }))
    return { sessionId, cwd: cwd ?? null, checkedAt: Date.now(), connections: rows }
  }

  /** Strict per-Session authorization used by both the route and the tools. */
  async assertSessionConnection(sessionId, connectionId, cwd) {
    const state = await this.sessionState(sessionId, cwd)
    if (state.selectedIds.length === 0) {
      throw new Error('当前会话还没有选择数据库，请先在输入框旁选择数据库 / no database is selected for this conversation')
    }
    if (!state.selectedIds.includes(connectionId)) {
      throw new Error('该数据库不在当前会话的选择范围内 / this database is not selected for this conversation')
    }
    return state
  }

  /** Record a use for future default selections. */
  touchUsage(connectionId, sessionId, cwd) {
    this.selections.touch(connectionId, { sessionId, cwd })
  }

  async addConnection(input) {
    await this.ready()
    const connection = await this.store.add(input)
    return connection
  }

  async updateConnection(id, patch) {
    await this.ready()
    await this.closeAdapter(id)
    return this.store.update(id, patch)
  }

  async removeConnection(id) {
    await this.ready()
    await this.closeAdapter(id)
    const removed = await this.store.remove(id)
    await this.selections.removeConnection(id)
    return removed
  }

  /** Test an unsaved form (or an existing connection when `id` is given). */
  async testConnection(input = {}) {
    await this.ready()
    const existing = input.id ? this.store.get(input.id) : null
    if (input.id && !existing) throw new Error('连接不存在 / connection not found')
    // Merge the saved row under the form so editing a connection and pressing
    // "test" does not require retyping a stored password.
    const candidate = existing ? { ...existing, ...input } : input
    if (existing && !candidate.password) delete candidate.password
    // Normalize a form without persisting it: this validates fields and fills
    // the same defaults the store would.
    const connection = normalizeConnection(candidate, existing)
    const adapter = await openConnection({ ...connection, readOnly: false })
    try {
      await adapter.ping()
      return { ok: true, target: connectionTarget(connection) }
    } finally {
      await adapter.close().catch(() => {})
    }
  }

  /** Close and forget one cached adapter. */
  async closeAdapter(id) {
    const entry = this.adapters.get(id)
    if (!entry) return
    this.adapters.delete(id)
    await entry.adapter.close().catch(() => {})
  }

  /** Get (or open) the cached adapter for a connection. */
  async #adapter(connection) {
    const now = Date.now()
    for (const [id, entry] of this.adapters) {
      if (now - entry.lastUsed > ADAPTER_IDLE_MS) {
        this.adapters.delete(id)
        entry.adapter.close().catch(() => {})
      }
    }
    let entry = this.adapters.get(connection.id)
    if (!entry) {
      const adapter = await openConnection(connection)
      entry = { adapter, lastUsed: now }
      this.adapters.set(connection.id, entry)
    } else {
      entry.lastUsed = now
    }
    return entry.adapter
  }

  /** Serialize writes per connection (SQLite in particular dislikes overlap). */
  #serialized(id, task) {
    const previous = this.writeQueues.get(id) ?? Promise.resolve()
    const next = previous.catch(() => {}).then(task)
    const tracked = next.finally(() => {
      if (this.writeQueues.get(id) === tracked) this.writeQueues.delete(id)
    })
    this.writeQueues.set(id, tracked)
    return tracked
  }

  /** List tables, or describe one table when `table` is provided. */
  async schema(id, table, options = {}) {
    if (options.sessionId) await this.assertSessionConnection(options.sessionId, id, options.cwd)
    const connection = await this.connection(id)
    const adapter = await this.#adapter(connection)
    const result = table
      ? await adapter.describeTable(String(table))
      : { connection: publicConnection(connection), tables: await adapter.listTables() }
    this.touchUsage(connection.id, options.sessionId, options.cwd)
    return result
  }

  /** One page of a table's rows. */
  async rows(id, table, options = {}) {
    if (options.sessionId) await this.assertSessionConnection(options.sessionId, id, options.cwd)
    const connection = await this.connection(id)
    if (!table) throw new Error('请选择一张表 / choose a table')
    const limit = clampLimit(options.limit, 50, this.config.maxRows)
    const offset = Math.max(0, Number.isFinite(Number(options.offset)) ? Math.floor(Number(options.offset)) : 0)
    const adapter = await this.#adapter(connection)
    const result = await adapter.fetchRows(String(table), { limit, offset })
    this.touchUsage(connection.id, options.sessionId, options.cwd)
    return { connection: publicConnection(connection), table: String(table), limit, offset, ...result }
  }

  /** Run a read-only query. */
  async query(id, sql, options = {}) {
    if (options.sessionId) await this.assertSessionConnection(options.sessionId, id, options.cwd)
    const connection = await this.connection(id)
    const limit = clampLimit(options.limit, this.config.maxRows, this.config.maxRows)
    const adapter = await this.#adapter(connection)
    const started = Date.now()
    const result = await adapter.query(sql, { limit })
    this.touchUsage(connection.id, options.sessionId, options.cwd)
    return { connection: publicConnection(connection), elapsedMs: Date.now() - started, ...result }
  }

  /** Run a write statement (or any single statement) after policy checks. */
  async execute(id, sql, options = {}) {
    if (options.sessionId) await this.assertSessionConnection(options.sessionId, id, options.cwd)
    const connection = await this.connection(id)
    if (connection.readOnly) throw new Error('该连接是只读连接 / this connection is read-only')
    if (this.config.allowWrite === false) throw new Error('插件配置已关闭写操作（allowWrite: false）/ writes are disabled by plugin config')
    if (!isSingleStatement(sql)) throw new Error('只允许执行一条 SQL / only one statement is allowed')
    return this.#serialized(connection.id, async () => {
      const adapter = await this.#adapter(connection)
      const started = Date.now()
      const result = await adapter.execute(sql)
      this.touchUsage(connection.id, options.sessionId, options.cwd)
      return { connection: publicConnection(connection), elapsedMs: result.elapsedMs ?? (Date.now() - started), ...result }
    })
  }

  /** Create the demo connection on demand (empty-state button). */
  async seedDemo() {
    await this.ready()
    await this.#ensureDemo()
    return this.overview()
  }

  /** Close every adapter (plugin disposal). */
  async dispose() {
    const entries = [...this.adapters.values()]
    this.adapters.clear()
    await Promise.all(entries.map((entry) => entry.adapter.close().catch(() => {})))
    await this.selections.flush().catch(() => {})
  }
}

/** Convenience factory used by the Cordis entry and tests. */
export function createStudio(options) {
  return new DatabaseStudio(options)
}
