# dsh-db-studio

A database studio for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH):

- **Sidebar entry** — a “Database” icon next to Plugins / Automation opens a global database panel.
- **Connects to databases** — SQLite (built in), PostgreSQL, MySQL.
- **Browse and query** — connections, tables/views, columns, paginated rows, and a SQL console.
- **Works in chat** — four model-facing tools let the assistant inspect and modify data in the conversation.

## Install

From GitHub:

```bash
DSH_CLI="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$DSH_CLI" plugin --profile desktop add github:etShaw-zh/dsh-db-studio
```

Or from a checkout:

```bash
git clone https://github.com/etShaw-zh/dsh-db-studio.git
cd dsh-db-studio
npm install
"$DSH_CLI" plugin --profile desktop add "$PWD"
```

Restart DeepSeek Harness afterwards: the host half is a Cordis plugin, so a page refresh is not enough.

## What you get

The first launch creates a demo SQLite database (`users`, `products`, `orders`) under
`$DSH_HOME/dsh-db-studio/demo.db`, so the panel has something to show before any setup.

Connections support SQLite files, PostgreSQL and MySQL servers. Passwords never reach the
browser or the model — the panel only sees `hasPassword`.

The tools are:

| Tool | Purpose |
| --- | --- |
| `db_list_connections` | List configured connections (secrets removed) |
| `db_describe_schema` | List tables/views, or describe one table's columns and row count |
| `db_query` | Run one read-only statement (SELECT / WITH / EXPLAIN / SHOW / PRAGMA) |
| `db_execute` | Run one write statement; requires `confirm: true` and is refused on read-only connections or when `allowWrite` is off |

Example prompts:

> Show me the 10 most recent orders in the demo database, highest total first.
>
> Create a `notes` table with id, title, body and created_at.


### In the conversation

- A **Database** view tab sits between Chat and Trajectory and shows the databases selected for the current conversation (tables, schema, rows, SQL).
- A **multi-select database picker** sits beside the workspace/permission controls in the composer. Selections are per conversation and are shared by the tab, the picker and the status strip.
- A **connection status pill** under the composer shows a single database's name/engine/table count, or a compact `3 databases · connected` summary for multiple selections. Click it for per-connection status, table counts and latency; it never widens or wraps the composer dock.
- The first time a conversation opens, it defaults to the connections recently used in that workspace; if there are none, all configured connections.
- Tool calls are **strictly scoped** to the conversation's selection: with nothing selected, `db_query`/`db_execute`/`db_describe_schema` refuse and ask the user to pick databases; an unselected `connectionId` is rejected.

## Configuration

```yaml
- insert:
    - id: db-studio
      name: dsh-db-studio
      config:
        demo: true          # seed the demo database when there are no connections
        allowWrite: true    # allow db_execute and write SQL in the panel
        agentTools: true    # register the four model tools
        maxRows: 200        # row cap for queries and table pages
        # dshHome: /path/to/.dsh
```

## Security notes

- Connections live in `$DSH_HOME/dsh-db-studio/connections.json` with directory `0700` and file `0600`.
- Passwords are stored in that local file so the client can reconnect without prompting.
  Prefer read-only database accounts plus the panel's “read-only connection” switch, or set
  `allowWrite: false` for production databases.
- The plugin makes no outbound requests of its own and reports nothing.

## Develop

```bash
npm install
node --test test/*.test.js
```

See [README.md](README.md) (Chinese) for the full feature and architecture notes.

## Links

- GitHub: <https://github.com/etShaw-zh/dsh-db-studio>
- Issues: <https://github.com/etShaw-zh/dsh-db-studio/issues>
