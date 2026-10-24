import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { Readable } from 'node:stream'
import { join } from 'node:path'
import { test } from 'node:test'
import plugin, { buildToolDefinitions, dispatch, Config, ROUTE } from '../lib/index.js'
import { DatabaseStudio } from '../lib/service.js'

const workspace = tmpdir()

test('Config materializes defaults and rejects bad values', () => {
  assert.deepEqual(Config['~standard'].validate(undefined).value, {
    demo: true, allowWrite: true, agentTools: true, maxRows: 200,
  })
  const bad = Config['~standard'].validate({ maxRows: -1, demo: 'yes' })
  assert.ok(bad.issues.length >= 2)
  const good = Config['~standard'].validate({ maxRows: 50, dshHome: '/tmp/x' })
  assert.equal(good.value.maxRows, 50)
  assert.equal(good.value.dshHome, '/tmp/x')
})

test('agent tools list, describe, query and execute', async () => {
  const home = await mkdtemp(join(workspace, '.tmp-test-'))
  const studio = new DatabaseStudio({ dshHome: home, config: { demo: true } })
  try {
    const [list, describe, query, execute] = buildToolDefinitions(studio)
    const listed = await list.execute({})
    assert.match(listed.summary, /示例数据库/)
    assert.equal(listed.connections.length, 1)

    const tables = await describe.execute({})
    assert.match(tables.summary, /users/)

    const columns = await describe.execute({ table: 'users' })
    assert.ok(columns.columns.some((column) => column.name === 'email'))
    assert.equal(columns.table, 'users')

    const result = await query.execute({ sql: 'SELECT name, city FROM users ORDER BY id LIMIT 3' })
    assert.equal(result.rows.length, 3)
    assert.ok(result.columns.includes('name'))
    assert.match(result.summary, /查询成功/)
    assert.match(result.summary, /\| name \| city \|/)

    await assert.rejects(
      () => execute.execute({ sql: 'DELETE FROM users', confirm: false }),
      /显式确认/,
    )
    const written = await execute.execute({
      sql: "INSERT INTO users (id,name,email,city,vip,created_at) VALUES (102,'助手','a102@example.com','上海',0,'2026-10-24 21:00:00')",
      confirm: true,
    })
    assert.equal(written.changes, 1)

    await assert.rejects(() => query.execute({ sql: 'DELETE FROM users' }), /read-only/)
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})

test('dispatch answers the HTTP action vocabulary', async () => {
  const home = await mkdtemp(join(workspace, '.tmp-test-'))
  const studio = new DatabaseStudio({ dshHome: home, config: { demo: true } })
  try {
    const overview = await dispatch(studio, { action: 'overview' })
    assert.equal(overview.ok, true)
    const id = overview.connections[0].id
    const rows = await dispatch(studio, { action: 'rows', id, table: 'orders', limit: 2, offset: 0 })
    assert.equal(rows.rows.length, 2)
    const query = await dispatch(studio, { action: 'query', id, sql: 'SELECT COUNT(*) AS n FROM orders' })
    assert.equal(query.rows[0].n, 18)
    await assert.rejects(() => dispatch(studio, { action: 'nope' }), /unknown action/)
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})

test('plugin registers the HTTP route and answers it', async () => {
  const home = await mkdtemp(join(workspace, '.tmp-test-'))
  const routes = []
  const cleanups = []
  const ctx = {
    effect(fn, _label) {
      const cleanup = fn()
      if (typeof cleanup === 'function') cleanups.push(cleanup)
    },
    inject(names, callback) {
      if (!names.includes('webServer')) return
      callback({
        effect(fn) {
          const cleanup = fn()
          if (typeof cleanup === 'function') cleanups.push(cleanup)
        },
        webServer: {
          register(options) {
            routes.push(options)
            return () => {}
          },
        },
      })
    },
  }
  plugin.apply(ctx, { demo: true, allowWrite: true, agentTools: false, maxRows: 200, dshHome: home })
  try {
    assert.equal(routes.length, 1)
    assert.equal(routes[0].path, ROUTE)
    const req = Readable.from([JSON.stringify({ action: 'overview' })])
    req.method = 'POST'
    let payload = null
    const res = {
      writeHead() {},
      end(body) { payload = JSON.parse(String(body)) },
    }
    await routes[0].handler(req, res)
    assert.equal(payload.ok, true)
    assert.equal(payload.connections[0].demo, true)

    // A cross-origin page is refused before the body is read.
    const crossReq = Readable.from([JSON.stringify({ action: 'overview' })])
    crossReq.method = 'POST'
    crossReq.headers = { origin: 'https://evil.example', host: '127.0.0.1:64820' }
    let refused = null
    const crossRes = {
      writeHead(status) { refused = status },
      end(body) { refused = { status: refused, body: JSON.parse(String(body)) } },
    }
    await routes[0].handler(crossReq, crossRes)
    assert.equal(refused.status, 403)
    assert.equal(refused.body.ok, false)
  } finally {
    for (const cleanup of cleanups) await cleanup()
    await rm(home, { recursive: true, force: true })
  }
})

test('agent tools honor the conversation selection', async () => {
  const home = await mkdtemp(join(workspace, '.tmp-test-'))
  const studio = new DatabaseStudio({ dshHome: home, config: { demo: true } })
  try {
    const overview = await studio.listConnections()
    const demo = overview.connections[0]
    const second = await studio.addConnection({ kind: 'sqlite', name: 'other', file: join(home, 'other.db') })
    const exec = { agent: { session: { id: 'session-tools', header: { cwd: '/workspace/demo' } } } }
    const [list, , query] = buildToolDefinitions(studio)

    await studio.setSessionSelection('session-tools', [demo.id], '/workspace/demo')
    const listed = await list.execute({}, exec)
    assert.deepEqual(listed.selectedIds, [demo.id])
    assert.equal(listed.connections.find((row) => row.id === demo.id).selected, true)
    assert.equal(listed.connections.find((row) => row.id === second.id).selected, false)

    const ok = await query.execute({ sql: 'SELECT COUNT(*) AS n FROM users' }, exec)
    assert.equal(ok.rows[0].n, 8)

    await assert.rejects(
      () => query.execute({ sql: 'SELECT 1', connectionId: second.id }, exec),
      /不在当前会话的选择范围/,
    )

    await studio.setSessionSelection('session-tools', [], '/workspace/demo')
    await assert.rejects(
      () => query.execute({ sql: 'SELECT 1' }, exec),
      /还没有选择数据库/,
    )
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})

test('dispatch exposes session-state, session-set and session-status', async () => {
  const home = await mkdtemp(join(workspace, '.tmp-test-'))
  const studio = new DatabaseStudio({ dshHome: home, config: { demo: true } })
  try {
    const state = await dispatch(studio, { action: 'session-state', sessionId: 's-api' })
    assert.equal(state.ok, true)
    assert.equal(state.selectedIds.length, 1)
    const id = state.selectedIds[0]

    const empty = await dispatch(studio, { action: 'session-set', sessionId: 's-api', ids: [] })
    assert.deepEqual(empty.selectedIds, [])

    const restored = await dispatch(studio, { action: 'session-set', sessionId: 's-api', ids: [id] })
    assert.deepEqual(restored.selectedIds, [id])

    const status = await dispatch(studio, { action: 'session-status', sessionId: 's-api' })
    assert.equal(status.connections[0].ok, true)

    await assert.rejects(
      () => dispatch(studio, { action: 'query', sessionId: 's-api', id: 'missing', sql: 'SELECT 1' }),
      /not selected|not found/,
    )
  } finally {
    await studio.dispose()
    await rm(home, { recursive: true, force: true })
  }
})
