import assert from 'node:assert/strict'
import { mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { DatabaseStudio } from '../lib/service.js'
import { normalizeConnection, publicConnection } from '../lib/store.js'

const workspace = tmpdir()

async function makeStudio(config = {}) {
  const home = await mkdtemp(join(workspace, '.tmp-test-'))
  const studio = new DatabaseStudio({ dshHome: home, config: { demo: true, ...config } })
  await studio.ready()
  return { home, studio }
}

test('normalizeConnection validates and redacts secrets', () => {
  const pg = normalizeConnection({
    kind: 'postgres', name: 'prod', host: 'db.local', database: 'app', user: 'me', password: 'secret',
  })
  assert.equal(pg.kind, 'postgres')
  assert.equal(pg.port, 5432)
  assert.equal(pg.host, 'db.local')
  const shown = publicConnection(pg)
  assert.equal(shown.password, undefined)
  assert.equal(shown.hasPassword, true)
  assert.throws(() => normalizeConnection({ kind: 'mysql', name: 'x' }), /database name/)
  assert.throws(() => normalizeConnection({ kind: 'access', name: 'x' }), /kind must be/)
})

test('demo database is created, browsable and queryable', async () => {
  const { home, studio } = await makeStudio()
  try {
    const overview = await studio.listConnections()
    assert.equal(overview.connections.length, 1)
    assert.equal(overview.connections[0].demo, true)
    assert.equal(overview.connections[0].kind, 'sqlite')
    assert.equal(overview.drivers.sqlite, true)

    const id = overview.connections[0].id
    const schema = await studio.schema(id)
    const names = schema.tables.map((row) => row.name)
    assert.deepEqual(names.sort(), ['orders', 'products', 'users'])

    const described = await studio.schema(id, 'users')
    assert.ok(described.columns.some((column) => column.name === 'email'))
    assert.ok(described.rowCount >= 8)

    const page = await studio.rows(id, 'users', { limit: 3 })
    assert.equal(page.rows.length, 3)
    assert.ok(page.total >= 8)

    const aggregate = await studio.query(id, 'SELECT status, COUNT(*) AS n FROM orders GROUP BY status ORDER BY status', { limit: 10 })
    assert.ok(aggregate.columns.includes('n'))
    assert.ok(aggregate.rows.length >= 2)

    await assert.rejects(() => studio.query(id, 'DELETE FROM users'), /read-only/)
    await assert.rejects(() => studio.query(id, 'SELECT 1; SELECT 2'), /one statement/)

    const write = await studio.execute(id, "INSERT INTO users (id,name,email,city,vip,created_at) VALUES (101,'测试','t101@example.com','杭州',0,'2026-10-24 21:00:00')")
    assert.equal(write.changes, 1)
    const readBack = await studio.query(id, 'SELECT name FROM users WHERE id = 101', { limit: 2 })
    assert.equal(readBack.rows.length, 1)
    assert.equal(readBack.rows[0].name, '测试')
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})

test('connection CRUD, read-only policy and testConnection', async () => {
  const { home, studio } = await makeStudio()
  try {
    const demo = (await studio.listConnections()).connections[0]
    const created = await studio.addConnection({ kind: 'sqlite', name: 'second', file: join(home, 'second.db'), readOnly: true })
    assert.equal(created.name, 'second')
    assert.equal(created.readOnly, true)
    assert.equal(created.hasPassword, false)

    const result = await studio.testConnection({ kind: 'sqlite', file: join(home, 'second.db') })
    assert.equal(result.ok, true)

    await assert.rejects(() => studio.execute(created.id, 'CREATE TABLE x (id INTEGER)'), /read-only/)

    const updated = await studio.updateConnection(created.id, { name: 'renamed' })
    assert.equal(updated.name, 'renamed')

    await studio.removeConnection(demo.id)
    const after = await studio.listConnections()
    assert.equal(after.connections.length, 1)
    assert.equal(after.connections[0].name, 'renamed')

    const storeFile = join(home, 'dsh-db-studio', 'connections.json')
    const mode = (await stat(storeFile)).mode & 0o777
    assert.equal(mode, 0o600)
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})

test('per-session selection defaults, strict scope and status', async () => {
  const { home, studio } = await makeStudio()
  try {
    const connections = (await studio.listConnections()).connections
    const demo = connections[0]
    const second = await studio.addConnection({ kind: 'sqlite', name: 'workspace-db', file: join(home, 'second.db') })

    // A new Session with no usage falls back to every configured connection.
    const fresh = await studio.sessionState('session-fresh', '/workspace/a')
    assert.deepEqual(fresh.selectedIds.sort(), [demo.id, second.id].sort())

    // Usage in a workspace drives the default for a later Session there.
    studio.touchUsage(second.id, 'session-old', '/workspace/a')
    await studio.selections.flush()
    const scoped = await studio.sessionState('session-scoped', '/workspace/a')
    assert.deepEqual(scoped.selectedIds, [second.id])

    // Strictness: selected only.
    await studio.setSessionSelection('session-scoped', [demo.id], '/workspace/a')
    const ok = await studio.query(demo.id, 'SELECT COUNT(*) AS n FROM users', { sessionId: 'session-scoped', cwd: '/workspace/a' })
    assert.equal(ok.rows[0].n, 8)
    await assert.rejects(
      () => studio.query(second.id, 'SELECT 1', { sessionId: 'session-scoped', cwd: '/workspace/a' }),
      /not selected/,
    )

    // Successful and failed SQL runs are recorded per Session; history is
    // newest-first and reproduce data (SQL + connection) survives the run.
    const history = await studio.sqlHistory('session-scoped')
    assert.equal(history.entries.length, 1)
    assert.equal(history.entries[0].sql, 'SELECT COUNT(*) AS n FROM users')
    assert.equal(history.entries[0].connectionId, demo.id)
    assert.equal(history.entries[0].ok, true)
    assert.equal(history.entries[0].source, 'ui')
    await assert.rejects(
      () => studio.query(demo.id, 'DELETE FROM users', { sessionId: 'session-scoped', cwd: '/workspace/a' }),
      /read-only/,
    )
    const failedHistory = await studio.sqlHistory('session-scoped')
    assert.equal(failedHistory.entries.length, 2)
    assert.equal(failedHistory.entries[0].ok, false)
    assert.match(failedHistory.entries[0].error, /read-only/)

    // The global panel groups the same records by conversation.
    const all = await studio.allSqlHistory()
    assert.equal(all.sessions.length, 1)
    assert.equal(all.sessions[0].sessionId, 'session-scoped')
    assert.equal(all.sessions[0].entries.length, 2)
    assert.equal(all.sessions[0].cwd, '/workspace/a')

    const cleared = await studio.clearSqlHistory('session-scoped')
    assert.equal(cleared.cleared, true)
    assert.equal((await studio.sqlHistory('session-scoped')).entries.length, 0)

    // Empty selection is explicit and refuses every connection.
    await studio.setSessionSelection('session-empty', [], '/workspace/a')
    await assert.rejects(() => studio.schema(demo.id, undefined, { sessionId: 'session-empty', cwd: '/workspace/a' }), /no database is selected/)
    await assert.rejects(() => studio.execute(demo.id, 'CREATE TABLE nope (id INTEGER)', { sessionId: 'session-empty' }), /no database is selected/)

    // Status reports a live connection and its table count.
    const status = await studio.sessionStatus('session-scoped', '/workspace/a')
    assert.equal(status.connections.length, 1)
    assert.equal(status.connections[0].id, demo.id)
    assert.equal(status.connections[0].ok, true)
    assert.ok(status.connections[0].tableCount >= 3)
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})
