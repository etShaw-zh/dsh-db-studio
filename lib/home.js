/**
 * Where dsh-db-studio keeps its data.
 *
 * The resolution mirrors `@deepseek-ai/dsh-home-paths`: an explicit config
 * wins over `$DSH_HOME`, which wins over `~/.dsh`; a blank environment value
 * is treated as unset. `~` and `~/...` are expanded against the OS home.
 *
 * @module dsh-db-studio/home
 */

import { homedir } from 'node:os'
import { isAbsolute, join, resolve } from 'node:path'

/** Expand the tilde forms the harness treats as the OS home. */
export function expandHomePath(path) {
  if (typeof path !== 'string') return path
  if (path === '~') return homedir()
  if (path.startsWith('~/') || path.startsWith('~\\')) return join(homedir(), path.slice(2))
  return path
}

/** Resolve the harness home: configured, else `$DSH_HOME`, else `~/.dsh`. */
export function resolveDshHome(configured, env = process.env) {
  const fromEnv = env.DSH_HOME
  const chosen = configured ?? (fromEnv !== undefined && fromEnv.trim() ? fromEnv : join(homedir(), '.dsh'))
  return resolve(expandHomePath(chosen))
}

/** The plugin's private directory under a harness home. */
export function studioHome(home) {
  return join(home, 'dsh-db-studio')
}

/** Make a path absolute without touching the filesystem. */
export function absolutePath(path) {
  const expanded = expandHomePath(path)
  return isAbsolute(expanded) ? resolve(expanded) : resolve(expanded)
}
