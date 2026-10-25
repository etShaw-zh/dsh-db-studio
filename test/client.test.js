import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import vm from 'node:vm'
import { test } from 'node:test'

const file = new URL('../lib/client.js', import.meta.url)

test('client bundle registers a sidebar entry and a main panel', async () => {
  const code = await readFile(file, 'utf8')
  const styles = []
  const document = {
    querySelector() { return null },
    createElement(tag) {
      return {
        tagName: tag,
        dataset: {},
        textContent: '',
        remove() {},
      }
    },
    head: {
      appendChild(node) { styles.push(node) },
    },
  }
  let captured = null
  const sandbox = {
    window: {
      __ModuleLoader__: {
        load(definition) { captured = definition },
      },
    },
    document,
    console,
  }
  vm.runInNewContext(code, sandbox, { filename: 'client.js' })
  assert.ok(captured, 'the bundle must register a module factory')
  assert.equal(captured.id, 'dsh-db-studio')

  const React = {
    createElement() { return null },
    useState() { return [undefined, () => {}] },
    useEffect() {},
  }
  const factory = captured.factory
  const client = factory((request) => {
    if (request === 'react') return React
    throw new Error('unexpected require: ' + request)
  })
  assert.equal(client.name, 'dsh-db-studio')
  assert.ok(client.inject.includes('slots'))
  assert.ok(client.inject.includes('layout'))
  assert.ok(client.inject.includes('locale'))

  const registrations = []
  const commandRegistrations = []
  const cleanups = []
  const ctx = {
    effect(fn) {
      const cleanup = fn()
      if (typeof cleanup === 'function') cleanups.push(cleanup)
    },
    get(name) {
      if (name === 'commandUi') {
        return {
          register(contribution) {
            commandRegistrations.push(contribution)
            return () => {}
          },
        }
      }
      return undefined
    },
    locale: {
      register() { return () => {} },
      bind() { return (key) => key },
    },
    slots: {
      inject(_name, callback) { callback() },
      register(options, component) {
        registrations.push({ options, component })
        return () => {}
      },
    },
  }
  client.apply(ctx)
  const main = registrations.find((row) => row.options.name === 'main')
  const sidebar = registrations.find((row) => row.options.name === 'sidebar.panellist')
  const view = registrations.find((row) => row.options.name === 'conversation.view')
  const picker = registrations.find((row) => row.options.name === 'conversation.input.left')
  const status = registrations.find((row) => row.options.name === 'conversation.composer.dock')
  assert.ok(main, 'must register the main panel')
  assert.equal(main.options.key, 'dbstudio')
  assert.equal(main.options.locale, 'dsh-db-studio')
  assert.ok(sidebar, 'must register the sidebar entry')
  assert.equal(sidebar.options.id, 'dbstudio')
  assert.equal(typeof sidebar.options.order, 'number')
  assert.equal(typeof sidebar.options.label, 'function')
  assert.ok(view, 'must register the conversation database tab')
  assert.equal(view.options.order, 5, 'the tab sits between Chat (0) and Trajectory (10)')
  assert.ok(picker, 'must register the composer multi-select')
  assert.equal(picker.options.id, 'dbstudio')
  assert.ok(status, 'must register the composer status strip')
  const command = commandRegistrations.find((row) => row.name === 'db')
  assert.ok(command, 'must register the /db slash command')
  assert.equal(command.ui.kind, 'action')
  assert.equal(typeof command.icon, 'function')
  assert.equal(typeof command.label, 'function')
  assert.equal(styles.length, 1, 'the bundle injects its stylesheet once')
  for (const cleanup of cleanups) cleanup()
  assert.equal(styles[0].textContent.includes('.dshdb-page'), true)
})
