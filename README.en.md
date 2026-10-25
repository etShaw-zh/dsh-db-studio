# dsh-db-studio

English ｜ [简体中文](./README.md)

[![test](https://github.com/etShaw-zh/dsh-db-studio/actions/workflows/test.yml/badge.svg)](https://github.com/etShaw-zh/dsh-db-studio/actions/workflows/test.yml)
[![License](https://img.shields.io/github/license/etShaw-zh/dsh-db-studio)](LICENSE)
[![release](https://img.shields.io/github/v/release/etShaw-zh/dsh-db-studio)](https://github.com/etShaw-zh/dsh-db-studio/releases)
[![npm](https://img.shields.io/npm/v/dsh-db-studio)](https://www.npmjs.com/package/dsh-db-studio)

Connect to databases in [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH), then query and edit data right in the conversation.

![Querying the demo database in a conversation](docs/demo.gif)

## What it does

### Browse and manage databases

- **Database panel in the sidebar**: browse connections, schemas and paginated data, and run SQL.
- **SQLite / PostgreSQL / MySQL**, with SQLite requiring no extra driver.

### Work in the conversation

- **Database tab in a conversation**: view and work with the selected databases without leaving the chat.
- **Multi-select picker in the composer**: choose the databases this conversation may use.
- **Talk to the data**: four agent tools for querying, creating tables and writing data.
- **`/db` command**: type `/`, pick **Database** from the command list, and open the database panel.
- **Query history**: a **Query history** tab in the conversation database panel records SQL, connection, timing and affected rows; click an entry to load it back into the SQL editor. The global database panel groups the same history by conversation, and clicking a group opens that conversation.

## Install

From npm:

```bash
# macOS desktop
DSH_CLI="/Applications/DeepSeek Harness.app/Contents/Resources/runtime/cli/bin/dsh"
"$DSH_CLI" plugin --profile desktop add dsh-db-studio@1.0.2
```

Or install directly from GitHub:

```bash
"$DSH_CLI" plugin --profile desktop add github:etShaw-zh/dsh-db-studio
```

Restart DeepSeek Harness afterwards. Stable builds are listed in [Releases](https://github.com/etShaw-zh/dsh-db-studio/releases). On Windows / Linux use the `dsh` path installed on your machine.

From source:

```bash
git clone https://github.com/etShaw-zh/dsh-db-studio.git
"$DSH_CLI" plugin --profile desktop add "$PWD/dsh-db-studio"
```

## Getting started

1. Open **Database** in the sidebar and create a connection, or use the built-in demo database.
2. Select the databases for the conversation, then ask the assistant to work with them:

> Show me the 10 most recent orders in the demo database, sorted by amount.
>
> Change every Hangzhou user's city to “Hangzhou · West Lake”.
>
> Add a notes field to the orders table.

The assistant can only access databases selected for the conversation; if none are selected, it asks you to choose one first.

## Configuration

Set these in the profile's `cordis.patch.yml`:

| Key | Default | Meaning |
| --- | --- | --- |
| `demo` | `true` | Create a demo database when there are no connections |
| `allowWrite` | `true` | Allow write operations |
| `agentTools` | `true` | Register the conversation tools |
| `maxRows` | `200` | Maximum rows returned by a query |

## Data and security

- Connections live in `~/.dsh/dsh-db-studio/connections.json` with file mode `0600`.
- Passwords stay on this machine and never reach the browser or the model context.
- For production databases, use a read-only account or connection, or set `allowWrite: false`.

## Development

```bash
npm install
npm test
```

Issues and PRs are welcome: <https://github.com/etShaw-zh/dsh-db-studio>

## License

MIT
