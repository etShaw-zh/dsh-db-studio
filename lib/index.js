/**
 * dsh-db-studio — Cordis entry (host half).
 *
 * Exposes two independent surfaces, both optional so a headless or non-HTTP
 * assembly still gets the other:
 *
 *   - `POST /dsh-db-studio/api` for the browser panel (overview, CRUD, rows,
 *     SQL).
 *   - model-facing tools `db_list_connections`, `db_describe_schema`,
 *     `db_query`, `db_execute`.
 *
 * The database work lives in `service.js`; this file only wires transports,
 * config and disposal. Host packages (`@deepseek-ai/dsh-tools`, `webServer`)
 * are probed through `optionalHostImport`, the same pattern dsh-bill uses, so
 * a `link:`ed checkout resolves them from the harness entry point.
 *
 * @module dsh-db-studio
 */

import { createStudio, DEFAULT_CONFIG } from './service.js'

const ROUTE = '/dsh-db-studio/api'
const MAX_BODY = 4 * 1024 * 1024

/** One issue in the Standard Schema config vocabulary. */
const issue = (message, ...path) => ({ message, path: path.length ? path : undefined })

/**
 * Plugin config as a Standard Schema.
 *
 * Defaults are materialized here, before the fiber starts, so `apply` always
 * receives a complete object and a typo is refused with its path named.
 */
export const Config = {
  '~standard': {
    version: 1,
    vendor: 'dsh-db-studio',
    validate(input) {
      if (input === undefined || input === null) return { value: { ...DEFAULT_CONFIG } }
      if (typeof input !== 'object' || Array.isArray(input)) return { issues: [issue('expected an object')] }
      const issues = []
      const value = {}
      const booleans = ['demo', 'allowWrite', 'agentTools']
      for (const key of booleans) {
        const raw = input[key]
        if (raw === undefined) value[key] = DEFAULT_CONFIG[key]
        else if (typeof raw !== 'boolean') issues.push(issue('expected a boolean', key))
        else value[key] = raw
      }
      const maxRows = input.maxRows
      if (maxRows === undefined) value.maxRows = DEFAULT_CONFIG.maxRows
      else if (typeof maxRows !== 'number' || !Number.isInteger(maxRows) || maxRows <= 0) issues.push(issue('expected a positive integer', 'maxRows'))
      else value.maxRows = maxRows
      const { dshHome } = input
      if (dshHome !== undefined) {
        if (typeof dshHome !== 'string' || !dshHome.trim()) issues.push(issue('expected a non-empty path', 'dshHome'))
        else value.dshHome = dshHome
      }
      return issues.length ? { issues } : { value }
    },
  },
}

/** Import a package that exists only inside the harness graph. */
async function optionalHostImport(specifier) {
  try {
    return await import(specifier)
  } catch {
    const entry = process.argv[1]
    if (typeof entry !== 'string' || entry === '') return null
    try {
      const { createRequire } = await import('node:module')
      const { pathToFileURL } = await import('node:url')
      const resolved = createRequire(entry).resolve(specifier)
      return await import(pathToFileURL(resolved).href)
    } catch {
      return null
    }
  }
}

/** Read a small JSON body. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > MAX_BODY) {
        req.destroy()
        reject(new Error('请求体过大 / request body too large'))
      }
    })
    req.on('end', () => {
      if (!data.trim()) return resolve({})
      try {
        resolve(JSON.parse(data))
      } catch {
        reject(new Error('请求体不是合法 JSON / invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

/** Format a cell for a markdown table. */
function cell(value) {
  if (value === null || value === undefined) return 'NULL'
  let text = typeof value === 'object' ? JSON.stringify(value) : String(value)
  if (text === '') return ' '
  text = text.replaceAll('|', '\\|').replaceAll('\n', ' ')
  return text.length > 120 ? text.slice(0, 117) + '...' : text
}

/** Render columns/rows as a markdown table, capped for the transcript. */
function markdownTable(columns, rows, maxRows = 20) {
  const cols = Array.isArray(columns) && columns.length ? columns : Object.keys(rows?.[0] ?? {})
  if (cols.length === 0 || !rows?.length) return ''
  const head = `| ${cols.map((name) => String(name).replaceAll('|', '\\|')).join(' | ')} |`
  const sep = `| ${cols.map(() => '---').join(' | ')} |`
  const body = rows.slice(0, maxRows).map((row) => `| ${cols.map((name) => cell(row?.[name])).join(' | ')} |`)
  const more = rows.length > maxRows ? `\n_… 还有 ${rows.length - maxRows} 行未显示_` : ''
  return [head, sep, ...body].join('\n') + more
}

/** The calling Session, when a tool was invoked from an agent turn. */
function sessionOf(exec) {
  const session = exec?.agent?.session
  return session === undefined ? null : { id: session.id, cwd: session.header?.cwd }
}

/**
 * Resolve a connection id for a tool call.
 *
 * The conversation's selection is the authorization boundary: a Session with
 * no databases selected is refused outright, and an explicit connectionId
 * outside the selection is refused too. Only the IDE-side panel (no Session)
 * sees every connection.
 */
async function resolveConnectionId(studio, requested, session) {
  const overview = await studio.listConnections()
  const rows = overview.connections
  const find = (id) => rows.find((row) => row.id === id)
  if (!session) {
    if (requested) {
      const found = find(requested)
      if (!found) throw new Error(`找不到连接 "${requested}"。可用连接：${rows.map((row) => `${row.id} (${row.name})`).join(', ') || '无'}`)
      return found.id
    }
    if (rows.length === 1) return rows[0].id
    if (rows.length === 0) throw new Error('还没有配置数据库连接。请让用户在「数据库」侧边栏面板新建连接后再试。')
    throw new Error(`有多个数据库连接，请用 connectionId 指定：${rows.map((row) => `${row.id} (${row.name})`).join(', ')}`)
  }
  const state = await studio.sessionState(session.id, session.cwd)
  const selected = state.selectedIds
  if (selected.length === 0) {
    throw new Error('当前会话还没有选择数据库。请让用户在输入框旁的多选下拉里选择数据库后再试。')
  }
  if (requested) {
    const found = find(requested)
    if (!found) throw new Error(`找不到连接 "${requested}"。当前会话可选：${selected.map((id) => `${id} (${find(id)?.name ?? id})`).join(', ')}`)
    if (!selected.includes(requested)) {
      throw new Error(`数据库 "${requested}" 不在当前会话的选择范围内。当前已选：${selected.map((id) => `${id} (${find(id)?.name ?? id})`).join(', ')}`)
    }
    return found.id
  }
  if (selected.length === 1) return selected[0]
  throw new Error(`当前会话选中了多个数据库，请用 connectionId 指定：${selected.map((id) => `${id} (${find(id)?.name ?? id})`).join(', ')}`)
}

/** Build the four model-facing tools. */
function buildToolDefinitions(studio) {
  return [
    {
      name: 'db_list_connections',
      description: 'List the database connections configured in DSH DB Studio, with their ids, kinds and targets, and mark which ones are selected for this conversation. '
        + 'Call this first when the user asks about data but you do not know which connection to use. Only selected connections may be queried. Passwords are never returned.',
      parameters: {},
      output: {
        schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            connections: { type: 'array', items: { type: 'object', additionalProperties: true } },
            drivers: { type: 'object', additionalProperties: true },
          },
          additionalProperties: true,
        },
        render: (_args, value) => [{ type: 'text', text: value?.summary ?? 'No connections.' }],
      },
      async execute(_args, exec) {
        const session = sessionOf(exec)
        const overview = await studio.listConnections()
        const rows = overview.connections
        let selectedIds = rows.map((row) => row.id)
        if (session) {
          const state = await studio.sessionState(session.id, session.cwd)
          selectedIds = state.selectedIds
        }
        const marked = rows.map((row) => ({ ...row, selected: selectedIds.includes(row.id) }))
        const selectedRows = marked.filter((row) => row.selected)
        const summary = rows.length === 0
          ? '还没有配置数据库连接。'
          : (selectedRows.length === 0
              ? '当前会话还没有选择数据库。请让用户先在输入框旁的数据库多选下拉里选择。\n'
              : `当前会话已选择 ${selectedRows.length} 个数据库：\n` + selectedRows.map((row) => `- \`${row.id}\` · ${row.name} · ${row.kind}${row.demo ? '（示例）' : ''}`).join('\n') + '\n\n')
            + `全部 ${rows.length} 个连接：\n` + marked.map((row) => `- \`${row.id}\` · ${row.name} · ${row.kind}${row.selected ? ' ✓ 已选' : ''}`).join('\n')
        return { summary, connections: marked, selectedIds, drivers: overview.drivers }
      },
    },
    {
      name: 'db_describe_schema',
      description: 'Inspect a database schema. Without `table`, lists every table and view. '
        + 'With `table`, returns that table\'s columns (type, nullability, default, primary key) and row count. '
        + 'Use it before writing SQL so column names and types are correct.',
      parameters: {
        connectionId: { type: 'string', description: 'Connection id from db_list_connections. Optional when the conversation has exactly one selected database; only selected databases are allowed.' },
        table: { type: 'string', description: "Table name, optionally schema-qualified (e.g. 'users' or 'public.users'). Omit to list tables." },
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            tables: { type: 'array', items: { type: 'object', additionalProperties: true } },
            table: { type: 'string' },
            columns: { type: 'array', items: { type: 'object', additionalProperties: true } },
            primaryKey: { type: 'array', items: { type: 'string' } },
            rowCount: { type: 'number' },
          },
          additionalProperties: true,
        },
        render: (_args, value) => [{ type: 'text', text: value?.summary ?? '' }],
      },
      async execute(args, exec) {
        const session = sessionOf(exec)
        const id = await resolveConnectionId(studio, args?.connectionId, session)
        const schema = await studio.schema(id, args?.table, session ? { sessionId: session.id, cwd: session.cwd } : {})
        if (schema.tables) {
          const list = schema.tables.map((row) => `- ${row.schema ? `${row.schema}.` : ''}${row.name} (${row.type})`)
          return {
            summary: `连接 \`${id}\` 中共有 ${schema.tables.length} 张表/视图：\n${list.join('\n') || '（空）'}`,
            tables: schema.tables,
          }
        }
        const lines = schema.columns.map((column) => {
          const flags = [column.primaryKey ? 'PK' : '', column.notNull ? 'NOT NULL' : ''].filter(Boolean).join(' ')
          return `- ${column.name} ${column.type}${flags ? ` — ${flags}` : ''}${column.defaultValue != null ? ` default ${column.defaultValue}` : ''}`
        })
        return {
          summary: `表 \`${schema.table}\`（${schema.rowCount} 行）的字段：\n${lines.join('\n')}`,
          table: schema.table,
          columns: schema.columns,
          primaryKey: schema.primaryKey,
          rowCount: schema.rowCount,
        }
      },
    },
    {
      name: 'db_query',
      description: 'Run a READ-ONLY SQL query (SELECT / WITH / EXPLAIN / SHOW / PRAGMA) against a database selected for this conversation and return columns and rows. '
        + 'Only the conversation\'s selected databases are allowed. Writes are rejected; use db_execute for INSERT/UPDATE/DELETE/DDL. '
        + 'Results are capped by the plugin\'s maxRows; aggregate in SQL rather than fetching everything. '
        + 'Use the exact table and column names returned by db_describe_schema.',
      parameters: {
        connectionId: { type: 'string', description: 'Connection id from db_list_connections. Optional when the conversation has exactly one selected database; only selected databases are allowed.' },
        sql: { type: 'string', required: true, description: 'One read-only SQL statement.' },
        limit: { type: 'number', description: 'Maximum rows to return (default 200, capped by plugin config).' },
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            columns: { type: 'array', items: { type: 'string' } },
            rows: { type: 'array', items: { type: 'object', additionalProperties: true } },
            rowCount: { type: 'number' },
            truncated: { type: 'boolean' },
            elapsedMs: { type: 'number' },
          },
          additionalProperties: true,
        },
        render: (_args, value) => [{ type: 'text', text: value?.summary ?? '' }],
      },
      async execute(args, exec) {
        const session = sessionOf(exec)
        const id = await resolveConnectionId(studio, args?.connectionId, session)
        const result = await studio.query(id, args?.sql, { limit: args?.limit, source: 'agent', ...(session ? { sessionId: session.id, cwd: session.cwd } : {}) })
        const rows = result.rows ?? []
        const summaryParts = [`查询成功，返回 ${rows.length} 行${result.truncated ? '（已截断）' : ''}，耗时 ${result.elapsedMs} ms。`]
        const table = markdownTable(result.columns, rows, 25)
        if (table) summaryParts.push(table)
        else summaryParts.push('（没有数据行）')
        return {
          summary: summaryParts.join('\n'),
          columns: result.columns,
          rows,
          rowCount: rows.length,
          truncated: result.truncated === true,
          elapsedMs: result.elapsedMs,
        }
      },
    },
    {
      name: 'db_execute',
      description: 'Run a single write statement (INSERT / UPDATE / DELETE / CREATE / ALTER / DROP) against a database selected for this conversation. '
        + 'Only the conversation\'s selected databases are allowed. Requires `confirm: true`; only set it after the user has clearly asked for the change. '
        + 'Prefer a targeted WHERE clause, and report the affected row count afterwards. '
        + 'Rejected when the connection is read-only or the plugin config disables writes.',
      parameters: {
        connectionId: { type: 'string', description: 'Connection id from db_list_connections. Optional when the conversation has exactly one selected database; only selected databases are allowed.' },
        sql: { type: 'string', required: true, description: 'One write statement.' },
        confirm: { type: 'boolean', required: true, description: 'Explicitly confirm the write. Set true only when the user asked for this change.' },
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            changes: { type: 'number' },
            lastInsertRowid: { type: 'string' },
            elapsedMs: { type: 'number' },
          },
          additionalProperties: true,
        },
        render: (_args, value) => [{ type: 'text', text: value?.summary ?? '' }],
      },
      async execute(args, exec) {
        if (args?.confirm !== true) throw new Error('写操作需要显式确认：请先在对话中得到用户同意，再以 confirm: true 重试。')
        const session = sessionOf(exec)
        const id = await resolveConnectionId(studio, args?.connectionId, session)
        const result = await studio.execute(id, args?.sql, { source: 'agent', ...(session ? { sessionId: session.id, cwd: session.cwd } : {}) })
        const affected = result.changes ?? 0
        return {
          summary: `执行成功：影响 ${affected} 行${result.lastInsertRowid != null ? `，最后插入 id = ${result.lastInsertRowid}` : ''}，耗时 ${result.elapsedMs ?? 0} ms。`,
          changes: affected,
          lastInsertRowid: result.lastInsertRowid == null ? '' : String(result.lastInsertRowid),
          elapsedMs: result.elapsedMs ?? 0,
        }
      },
    },
  ]
}

/** Dispatch one HTTP request body. */
async function dispatch(studio, body, options = {}) {
  const action = body?.action
  if (!action) throw new Error('缺少 action / missing action')
  const sessionId = typeof body.sessionId === 'string' && body.sessionId ? body.sessionId : undefined
  const cwd = sessionId ? (body.cwd ?? options.cwdOf?.(sessionId)) : undefined
  const scoped = sessionId ? { sessionId, cwd } : {}
  switch (action) {
    case 'overview':
    case 'list':
      return { ok: true, ...(await studio.listConnections()) }
    case 'session-state':
      return { ok: true, ...(await studio.sessionState(sessionId, cwd)) }
    case 'session-set':
      return { ok: true, ...(await studio.setSessionSelection(sessionId, body.ids, cwd)) }
    case 'session-status':
      return { ok: true, ...(await studio.sessionStatus(sessionId, cwd)) }
    case 'tables':
      return { ok: true, ...(await studio.schema(body.id, undefined, scoped)) }
    case 'describe':
      return { ok: true, ...(await studio.schema(body.id, body.table, scoped)) }
    case 'rows':
      return { ok: true, ...(await studio.rows(body.id, body.table, { limit: body.limit, offset: body.offset, ...scoped })) }
    case 'query':
      return { ok: true, ...(await studio.query(body.id, body.sql, { limit: body.limit, source: 'ui', ...scoped })) }
    case 'execute':
      return { ok: true, ...(await studio.execute(body.id, body.sql, { source: 'ui', ...scoped })) }
    case 'history-list':
      return { ok: true, ...(await studio.sqlHistory(sessionId)) }
    case 'history-all':
      return { ok: true, ...(await studio.allSqlHistory()) }
    case 'history-clear':
      return { ok: true, ...(await studio.clearSqlHistory(sessionId)) }
    case 'test':
      return { ok: true, ...(await studio.testConnection(body.connection ?? body)) }
    case 'add':
      return { ok: true, connection: await studio.addConnection(body.connection ?? body) }
    case 'update':
      return { ok: true, connection: await studio.updateConnection(body.id, body.patch ?? {}) }
    case 'remove':
      return { ok: true, removed: await studio.removeConnection(body.id) }
    case 'seed-demo':
      return { ok: true, ...(await studio.seedDemo()) }
    case 'ping':
      return { ok: true, time: Date.now() }
    default:
      throw new Error(`未知操作 / unknown action: ${action}`)
  }
}

/** Cordis plugin entry. */
export default {
  name: 'dsh-db-studio',
  Config,
  inject: [],
  apply(ctx, config = null) {
    const cfg = config ?? { ...DEFAULT_CONFIG }
    const studio = createStudio({ dshHome: cfg.dshHome, config: cfg })

    // Kick the load/demo seed off now; individual requests await the same
    // promise, so the first request after boot cannot race it.
    studio.ready().catch((error) => {
      console.warn('dsh-db-studio: initialization failed —', error?.message ?? error)
    })

    ctx.effect(() => () => studio.dispose().catch(() => {}), 'dsh-db-studio: adapters')

    // Live Session lookup for workspace-aware defaults. `sessions` may not be
    // mounted in every assembly, so this is a probe rather than an inject.
    const cwdOf = (sessionId) => {
      try {
        const sessions = ctx.get('sessions')
        return sessions?.get?.(sessionId)?.header?.cwd
      } catch {
        return undefined
      }
    }

    // ── HTTP carrier for the browser panel ────────────────────────────────
    ctx.inject(['webServer'], (child) => {
      child.effect(() => child.webServer.register({
        kind: 'exact',
        path: ROUTE,
        handler: async (req, res) => {
          const send = (status, payload) => {
            res.writeHead(status, {
              'Content-Type': 'application/json; charset=utf-8',
              'Cache-Control': 'no-store',
            })
            res.end(JSON.stringify(payload))
          }
          // Only same-origin pages may talk to this route. A cross-origin
          // fetch that uses a "simple" content type (text/plain) would skip
          // preflight and could otherwise write data without reading a reply.
          const origin = req.headers?.origin
          if (typeof origin === 'string' && origin !== '') {
            let sameOrigin = false
            try { sameOrigin = new URL(origin).host === req.headers.host } catch { sameOrigin = false }
            if (!sameOrigin) {
              send(403, { ok: false, error: 'cross-origin request refused' })
              return
            }
          }
          if (req.method !== 'POST') {
            send(200, { ok: true, service: 'dsh-db-studio', route: ROUTE })
            return
          }
          try {
            const body = await readBody(req)
            send(200, await dispatch(studio, body, { cwdOf }))
          } catch (error) {
            send(200, { ok: false, error: error?.message ?? String(error) })
          }
        },
      }), 'dsh-db-studio: http api')
    })

    // ── model-facing tools ───────────────────────────────────────────────
    if (cfg.agentTools !== false) {
      ctx.inject(['tools'], (child) => {
        optionalHostImport('@deepseek-ai/dsh-tools').then((mod) => {
          if (!mod?.defineTool) {
            console.warn('dsh-db-studio: @deepseek-ai/dsh-tools not reachable; agent tools are disabled')
            return
          }
          try {
            child.effect(() => {
              const definitions = buildToolDefinitions(studio)
              const disposers = definitions.map((definition) => child.tools.register(mod.defineTool(definition)))
              console.info('dsh-db-studio: registered ' + definitions.length + ' agent tools (' + definitions.map((definition) => definition.name).join(', ') + ')')
              return () => { for (const dispose of disposers) dispose?.() }
            }, 'dsh-db-studio: agent tools')
          } catch (error) {
            console.warn('dsh-db-studio: agent tools not registered —', error?.message ?? error)
          }
        }).catch((error) => {
          console.warn('dsh-db-studio: agent tools not registered —', error?.message ?? error)
        })
      })
    }
  },
}

export { buildToolDefinitions, dispatch, markdownTable, ROUTE }
