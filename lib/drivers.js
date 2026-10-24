/**
 * Database adapters.
 *
 * Three kinds share one small interface so the HTTP API, the agent tools and
 * the browser half never branch on the engine:
 *
 *   ping(), listTables(), describeTable(name), countRows(name),
 *   fetchRows(name, { limit, offset }), query(sql, { limit }),
 *   execute(sql), close()
 *
 * SQLite rides Node's built-in `node:sqlite` (the same module the harness's
 * own session index uses), so it needs no dependency at all. PostgreSQL and
 * MySQL load `pg` / `mysql2` lazily and report a friendly error if a deployment
 * chose not to install them.
 *
 * @module dsh-db-studio/drivers
 */

import { stat } from 'node:fs/promises'
import { dirname } from 'node:path'

/** Quote a SQL identifier for the given kind. */
export function quoteIdentifier(kind, name) {
  const value = String(name)
  if (kind === 'mysql') return '`' + value.replaceAll('`', '``') + '`'
  return '"' + value.replaceAll('"', '""') + '"'
}

/** Quote a possibly schema-qualified table name. */
export function quoteTable(kind, table) {
  if (kind === 'sqlite' || kind === 'mysql') {
    const parts = table.split('.')
    return parts.map((part) => quoteIdentifier(kind, part)).join('.')
  }
  return table.split('.').map((part) => quoteIdentifier(kind, part)).join('.')
}

/**
 * Strip comments and string literals so keyword guards cannot be fooled by
 * text inside a value. This is a guard, not a parser; the database remains the
 * authority on syntax.
 */
export function stripSqlNoise(sql) {
  let out = ''
  let i = 0
  const n = sql.length
  while (i < n) {
    const ch = sql[i]
    const next = sql[i + 1]
    if (ch === '-' && next === '-') {
      const end = sql.indexOf('\n', i + 2)
      i = end === -1 ? n : end + 1
      out += ' '
      continue
    }
    if (ch === '/' && next === '*') {
      const end = sql.indexOf('*/', i + 2)
      i = end === -1 ? n : end + 2
      out += ' '
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch
      i++
      while (i < n) {
        if (sql[i] === quote) {
          if (sql[i + 1] === quote) {
            i += 2
            continue
          }
          i++
          break
        }
        i++
      }
      out += " '' "
      continue
    }
    out += ch
    i++
  }
  return out
}

/** True when the SQL is a single statement. */
export function isSingleStatement(sql) {
  const clean = stripSqlNoise(sql).trim().replace(/;+\s*$/, '')
  if (clean.includes(';')) return false
  return clean.length > 0
}

/** Read-only statements accepted by `db_query`. */
export function isReadOnlySql(sql) {
  const clean = stripSqlNoise(sql).trim()
  if (!clean) return false
  const first = clean.match(/^\(?\s*([a-z]+)/i)?.[1]?.toLowerCase()
  if (!['select', 'with', 'explain', 'pragma', 'show', 'describe', 'desc', 'values', 'table'].includes(first)) return false
  if (first === 'pragma' && /=/.test(clean)) return false
  const forbidden = /\b(insert|update|delete|merge|replace|create|alter|drop|truncate|attach|detach|vacuum|reindex|grant|revoke|call|copy|load|begin|commit|rollback|savepoint|lock|unlock)\b/i
  return !forbidden.test(clean)
}

/** Make sure a SQL text is not empty. */
export function requireSql(sql) {
  const value = typeof sql === 'string' ? sql.trim() : ''
  if (!value) throw new Error('SQL 不能为空 / SQL is empty')
  return value
}

/** Ensure the directory of a SQLite file exists? No: SQLite creates files, not dirs. */
async function assertSqliteParent(file) {
  try {
    const info = await stat(dirname(file))
    if (!info.isDirectory()) throw new Error('不是一个目录 / not a directory')
  } catch (error) {
    if (error?.code === 'ENOENT') throw new Error(`SQLite 文件所在目录不存在 / parent directory does not exist: ${dirname(file)}`)
    throw error
  }
}

// ── SQLite ─────────────────────────────────────────────────────────────────

/** Open a SQLite database through node:sqlite. */
async function openSqlite(connection, options) {
  const { DatabaseSync } = await import('node:sqlite')
  await assertSqliteParent(connection.file)
  const db = new DatabaseSync(connection.file, { readOnly: options.readOnly === true })
  try {
    db.exec('PRAGMA foreign_keys = ON')
  } catch {
    // A read-only handle still answers queries; the pragma is best-effort.
  }

  const columnsOf = (statement) => {
    try {
      return statement.columns().map((column) => column.name)
    } catch {
      return []
    }
  }

  return {
    kind: 'sqlite',
    async ping() {
      db.prepare('SELECT 1 AS ok').get()
      return true
    },
    async listTables() {
      const rows = db.prepare(
        "SELECT name, type FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY name",
      ).all()
      return rows.map((row) => ({ name: row.name, type: row.type, schema: null }))
    },
    async describeTable(table) {
      const info = db.prepare(`PRAGMA table_info(${quoteIdentifier('sqlite', table)})`).all()
      if (info.length === 0) throw new Error(`表不存在 / table not found: ${table}`)
      const columns = info.map((row) => ({
        name: row.name,
        type: row.type || 'ANY',
        notNull: Number(row.notnull) === 1,
        defaultValue: row.dflt_value ?? null,
        primaryKey: Number(row.pk) > 0,
        extra: '',
      }))
      const count = await this.countRows(table)
      return { table, schema: null, columns, primaryKey: columns.filter((column) => column.primaryKey).map((column) => column.name), rowCount: count }
    },
    async countRows(table) {
      const row = db.prepare(`SELECT COUNT(*) AS count FROM ${quoteIdentifier('sqlite', table)}`).get()
      return Number(row?.count ?? 0)
    },
    async fetchRows(table, { limit = 50, offset = 0 } = {}) {
      const statement = db.prepare(
        `SELECT * FROM ${quoteIdentifier('sqlite', table)} LIMIT ? OFFSET ?`,
      )
      const rows = statement.all(limit, offset)
      return { columns: columnsOf(statement), rows, total: await this.countRows(table) }
    },
    async query(sql, { limit = 200 } = {}) {
      const value = requireSql(sql)
      if (!isSingleStatement(value)) throw new Error('只允许执行一条 SQL / only one statement is allowed')
      if (!isReadOnlySql(value)) throw new Error('db_query 只接受只读 SQL；写操作请使用 db_execute / db_query is read-only, use db_execute for writes')
      const statement = db.prepare(value)
      const columns = columnsOf(statement)
      const rows = []
      let truncated = false
      const iterator = statement.iterate()
      try {
        for (const row of iterator) {
          if (rows.length >= limit) {
            truncated = true
            break
          }
          rows.push(row)
        }
      } finally {
        iterator?.return?.()
      }
      return { columns, rows, truncated }
    },
    async execute(sql) {
      const value = requireSql(sql)
      const started = Date.now()
      const isInsert = /^\s*(insert|replace)\b/i.test(stripSqlNoise(value))
      db.exec(value)
      let changes = 0
      let lastInsertRowid = null
      try {
        const info = db.prepare('SELECT changes() AS changes, last_insert_rowid() AS id').get()
        changes = Number(info?.changes ?? 0)
        // `last_insert_rowid()` is connection-wide and keeps the previous
        // INSERT's value after an UPDATE or DDL, so only report it for an
        // insert that actually changed a row.
        if (isInsert && changes > 0) lastInsertRowid = info?.id ?? null
      } catch {
        // DDL and multi-statement scripts may leave no row to read.
      }
      return { changes, lastInsertRowid, elapsedMs: Date.now() - started }
    },
    async close() {
      db.close()
    },
  }
}

// ── PostgreSQL ──────────────────────────────────────────────────────────────

async function openPostgres(connection) {
  let pg
  try {
    pg = await import('pg')
  } catch {
    throw new Error('未安装 PostgreSQL 驱动。请在插件目录运行 npm install pg / pg driver is not installed')
  }
  const Pool = pg.Pool ?? pg.default?.Pool
  if (!Pool) throw new Error('pg 驱动加载失败 / failed to load the pg driver')
  const pool = new Pool({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    database: connection.database,
    ssl: connection.ssl ? { rejectUnauthorized: false } : undefined,
    max: 2,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
  })

  const splitTable = (table) => {
    const parts = String(table).split('.')
    return parts.length > 1 ? { schema: parts[0], name: parts[1] } : { schema: 'public', name: parts[0] }
  }

  return {
    kind: 'postgres',
    async ping() {
      await pool.query('SELECT 1')
      return true
    },
    async listTables() {
      const result = await pool.query(
        `SELECT table_schema AS schema, table_name AS name, table_type AS type
           FROM information_schema.tables
          WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
            AND table_type IN ('BASE TABLE', 'VIEW')
          ORDER BY table_schema, table_name`,
      )
      return result.rows.map((row) => ({ schema: row.schema, name: row.name, type: row.type === 'VIEW' ? 'view' : 'table' }))
    },
    async describeTable(table) {
      const { schema, name } = splitTable(table)
      const result = await pool.query(
        `SELECT column_name AS name, data_type AS type, is_nullable AS nullable,
                column_default AS default_value
           FROM information_schema.columns
          WHERE table_schema = $1 AND table_name = $2
          ORDER BY ordinal_position`,
        [schema, name],
      )
      if (result.rows.length === 0) throw new Error(`表不存在 / table not found: ${table}`)
      const keys = await pool.query(
        `SELECT kcu.column_name AS name
           FROM information_schema.table_constraints tc
           JOIN information_schema.key_column_usage kcu
             ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
          WHERE tc.constraint_type = 'PRIMARY KEY' AND tc.table_schema = $1 AND tc.table_name = $2`,
        [schema, name],
      )
      const primaryKey = new Set(keys.rows.map((row) => row.name))
      const columns = result.rows.map((row) => ({
        name: row.name,
        type: row.type,
        notNull: row.nullable === 'NO',
        defaultValue: row.default_value,
        primaryKey: primaryKey.has(row.name),
        extra: '',
      }))
      return { table, schema, columns, primaryKey: [...primaryKey], rowCount: await this.countRows(table) }
    },
    async countRows(table) {
      const result = await pool.query(`SELECT COUNT(*)::bigint AS count FROM ${quoteTable('postgres', table)}`)
      return Number(result.rows[0]?.count ?? 0)
    },
    async fetchRows(table, { limit = 50, offset = 0 } = {}) {
      const result = await pool.query(
        `SELECT * FROM ${quoteTable('postgres', table)} LIMIT $1 OFFSET $2`,
        [limit, offset],
      )
      return {
        columns: result.fields.map((field) => field.name),
        rows: result.rows,
        total: await this.countRows(table),
      }
    },
    async query(sql, { limit = 200 } = {}) {
      const value = requireSql(sql)
      if (!isSingleStatement(value)) throw new Error('只允许执行一条 SQL / only one statement is allowed')
      if (!isReadOnlySql(value)) throw new Error('db_query 只接受只读 SQL；写操作请使用 db_execute / db_query is read-only, use db_execute for writes')
      const result = await pool.query(value)
      const rows = result.rows.slice(0, limit)
      return {
        columns: result.fields?.map((field) => field.name) ?? Object.keys(rows[0] ?? {}),
        rows,
        truncated: result.rows.length > limit,
      }
    },
    async execute(sql) {
      const value = requireSql(sql)
      const started = Date.now()
      const result = await pool.query(value)
      return {
        changes: result.rowCount ?? 0,
        lastInsertRowid: null,
        elapsedMs: Date.now() - started,
        command: result.command,
      }
    },
    async close() {
      await pool.end()
    },
  }
}

// ── MySQL ──────────────────────────────────────────────────────────────────

async function openMysql(connection) {
  let mysql
  try {
    mysql = await import('mysql2/promise')
  } catch {
    throw new Error('未安装 MySQL 驱动。请在插件目录运行 npm install mysql2 / mysql2 driver is not installed')
  }
  const createPool = mysql.createPool ?? mysql.default?.createPool
  if (typeof createPool !== 'function') throw new Error('mysql2 驱动加载失败 / failed to load the mysql2 driver')
  const pool = createPool({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    database: connection.database,
    ssl: connection.ssl ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 2,
    connectTimeout: 8_000,
    dateStrings: true,
  })

  return {
    kind: 'mysql',
    async ping() {
      await pool.query('SELECT 1')
      return true
    },
    async listTables() {
      const [rows] = await pool.query(
        `SELECT table_name AS name, table_type AS type
           FROM information_schema.tables
          WHERE table_schema = DATABASE()
          ORDER BY table_name`,
      )
      return rows.map((row) => ({ name: row.name, schema: null, type: row.type === 'VIEW' ? 'view' : 'table' }))
    },
    async describeTable(table) {
      const name = table.includes('.') ? table.split('.').pop() : table
      const [rows] = await pool.query(`SHOW FULL COLUMNS FROM ${quoteIdentifier('mysql', name)}`)
      if (!rows || rows.length === 0) throw new Error(`表不存在 / table not found: ${table}`)
      const columns = rows.map((row) => ({
        name: row.Field,
        type: row.Type,
        notNull: row.Null === 'NO',
        defaultValue: row.Default,
        primaryKey: row.Key === 'PRI',
        extra: row.Extra ?? '',
      }))
      return {
        table,
        schema: null,
        columns,
        primaryKey: columns.filter((column) => column.primaryKey).map((column) => column.name),
        rowCount: await this.countRows(table),
      }
    },
    async countRows(table) {
      const name = table.includes('.') ? table.split('.').pop() : table
      const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM ${quoteIdentifier('mysql', name)}`)
      return Number(rows[0]?.count ?? 0)
    },
    async fetchRows(table, { limit = 50, offset = 0 } = {}) {
      const name = table.includes('.') ? table.split('.').pop() : table
      const [rows, fields] = await pool.query(
        `SELECT * FROM ${quoteIdentifier('mysql', name)} LIMIT ? OFFSET ?`,
        [limit, offset],
      )
      return { columns: (fields ?? []).map((field) => field.name), rows, total: await this.countRows(table) }
    },
    async query(sql, { limit = 200 } = {}) {
      const value = requireSql(sql)
      if (!isSingleStatement(value)) throw new Error('只允许执行一条 SQL / only one statement is allowed')
      if (!isReadOnlySql(value)) throw new Error('db_query 只接受只读 SQL；写操作请使用 db_execute / db_query is read-only, use db_execute for writes')
      const [rows, fields] = await pool.query(value)
      if (!Array.isArray(rows)) throw new Error('这条语句没有返回结果 / the statement returned no result set')
      return {
        columns: (fields ?? []).map((field) => field.name),
        rows: rows.slice(0, limit),
        truncated: rows.length > limit,
      }
    },
    async execute(sql) {
      const value = requireSql(sql)
      const started = Date.now()
      const isInsert = /^\s*(insert|replace)\b/i.test(stripSqlNoise(value))
      const [result] = await pool.query(value)
      const changes = result?.affectedRows ?? 0
      return {
        changes,
        lastInsertRowid: isInsert && changes > 0 && result?.insertId ? result.insertId : null,
        elapsedMs: Date.now() - started,
      }
    },
    async close() {
      await pool.end()
    },
  }
}

/**
 * Open a connection. `options.readOnly` is honored where the engine supports
 * it (SQLite today); every engine additionally gets the SQL guard in `query`.
 */
export async function openConnection(connection, options = {}) {
  if (!connection) throw new Error('连接不存在 / connection not found')
  if (connection.kind === 'sqlite') return openSqlite(connection, options)
  if (connection.kind === 'postgres') return openPostgres(connection, options)
  if (connection.kind === 'mysql') return openMysql(connection, options)
  throw new Error(`不支持的连接类型 / unsupported connection kind: ${connection.kind}`)
}
