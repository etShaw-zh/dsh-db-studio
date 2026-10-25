window.__ModuleLoader__.load({
  id: "dsh-db-studio",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");
    var ReactDOM = null;
    try { ReactDOM = require("react-dom"); } catch (error) { ReactDOM = null; }
    var h = React.createElement;
    var NS = "dsh-db-studio";
    var API = "/dsh-db-studio/api";

    // ── copy ────────────────────────────────────────────────────────────
    var zh = {
      title: "数据库",
      subtitle: "连接、浏览和查询数据库，也可以直接在对话里让助手操作数据",
      connections: "连接",
      newConnection: "新建连接",
      refresh: "刷新",
      emptyTitle: "还没有数据库连接",
      emptyDesc: "连接 SQLite 文件或 PostgreSQL / MySQL 服务。也可以先用内置示例数据库体验。",
      useDemo: "使用示例数据库",
      demo: "示例",
      readOnly: "只读",
      tables: "表",
      schema: "结构",
      data: "数据",
      sql: "SQL",
      history: "查询历史",
      historyEmpty: "还没有查询记录。在 SQL 页运行查询后会出现在这里。",
      historyClear: "清空历史",
      historyReproduce: "复现",
      historyReproduceHint: "载入到 SQL 页，不会自动执行",
      historySuccess: "成功",
      historyFailed: "失败",
      historyRows: "{n} 行",
      historyChanges: "影响 {n} 行",
      historyAgent: "助手",
      historyConsole: "控制台",
      historyUnavailable: "连接 {name} 已不在当前会话的选择范围内",
      historyOpen: "进入对话",
      historyOpenFailed: "无法打开对话",
      historyOpenFailedDetail: "打开对话失败：{error}",
      historyTurn: "第 {n} 轮",
      historyManual: "手动查询",
      historyTurnNoPrompt: "未命名输入",
      run: "运行",
      running: "运行中…",
      searchTable: "搜索表…",
      noTables: "这个数据库里没有表",
      rows: "行",
      page: "第 {page} 页",
      prev: "上一页",
      next: "下一页",
      pageSize: "每页",
      loading: "加载中…",
      noRows: "没有数据",
      nullValue: "NULL",
      test: "测试连接",
      testing: "测试中…",
      save: "保存",
      saving: "保存中…",
      cancel: "取消",
      edit: "编辑",
      remove: "删除",
      removeTitle: "删除连接",
      removeDesc: "删除后不影响数据库本身，只移除这里的连接配置。",
      confirmRemove: "确认删除",
      name: "名称",
      kind: "类型",
      file: "SQLite 文件路径",
      fileHint: "支持 ~ 开头的路径；文件不存在时会新建。",
      host: "主机",
      port: "端口",
      database: "数据库",
      user: "用户名",
      password: "密码",
      passwordKeep: "已保存，留空表示不修改",
      ssl: "使用 SSL",
      advanced: "高级选项",
      readonlyConnection: "只读连接（禁止写操作）",
      testOk: "连接成功：{target}",
      testFail: "连接失败：{error}",
      saveFailed: "保存失败：{error}",
      loadFailed: "加载失败：{error}",
      queryFailed: "执行失败：{error}",
      sqlHint: "只读 SQL 会自动走 db_query；INSERT / UPDATE / DELETE 等写操作会走 db_execute，并由你这次点击确认。",
      sqlPlaceholder: "SELECT * FROM users LIMIT 20;",
      result: "结果",
      affected: "影响 {n} 行",
      truncated: "结果已截断",
      columns: "字段",
      noConnection: "请选择一个连接",
      selectTable: "从左侧选择一张表",
      selectTableHint: "可以查看数据、结构和执行 SQL。",
      driverMissing: "未安装 {driver} 驱动，使用该类型连接前需要安装依赖。",
      demoNote: "示例数据库位于 {path}",
      inChat: "在对话中操作",
      inChatHint: "试试对助手说：「查一下示例数据库里最近 10 笔订单，按金额排序」或「把 users 表里杭州的用户城市改成杭州·西湖区」。",
      sqlHistory: "最近查询",
      clear: "清空",
      copy: "复制",
      copied: "已复制",
      close: "关闭",
      table: "表",
      view: "视图",
      pk: "主键",
      notNull: "非空",
      defaultLabel: "默认值",
      dialect: "SQL 方言",
      notEditableDemo: "示例连接可以直接浏览和修改数据；删除后也可以从空状态重新创建。",
      kindSqlite: "SQLite",
      kindPostgres: "PostgreSQL",
      kindMysql: "MySQL",
      tabsAria: "数据库视图切换",
      closeDialog: "关闭对话框",
      rowIndex: "#",
      totalRows: "共 {n} 行",
      serverError: "服务器返回错误",
      needConnectionName: "请填写连接名称",
      needDatabase: "请填写数据库名",
      needFile: "请填写 SQLite 文件路径",
      unsupportedAction: "这个操作在当前 DSH 版本不可用。",
      selectAll: "全选",
      clearAll: "清空",
      done: "完成",
      openPanel: "打开数据库面板",
      selectDatabase: "选择数据库",
      noConnections: "还没有数据库连接",
      statusLabel: "数据库连接状态",
      tableCount: "{n} 张表",
      statusFailed: "连接失败",
      statusChecking: "检查中",
      noSelectionTitle: "还没有选择数据库",
      noSelectionDesc: "在输入框旁的多选下拉里选择要在这个对话中使用的数据库。",
      selectAllRecent: "全选最近使用",
      openGlobal: "打开全局面板",
      conversationEmptyTitle: "这个对话还没有数据库",
      conversationEmptyDesc: "先新建一个连接，或使用内置示例数据库开始。",
      selected: "已选",
      databases: "数据库",
      connectionCount: "{n} 个连接",
      databaseCount: "{n} 个数据库",
      connectedOf: "{ok}/{n} 已连接",
      allConnected: "已连接",
      schemaHint: "点击「结构」查看字段",
      askInChat: "可以直接在对话里让助手查询或修改这些数据",
      commandLabel: "数据库",
      commandDesc: "打开数据库面板"
    };
    var en = {
      title: "Database",
      subtitle: "Connect, browse and query databases — or ask the assistant to work with the data in chat",
      connections: "Connections",
      newConnection: "New connection",
      refresh: "Refresh",
      emptyTitle: "No database connections yet",
      emptyDesc: "Connect a SQLite file or a PostgreSQL / MySQL server. You can start with the built-in demo database.",
      useDemo: "Use demo database",
      demo: "Demo",
      readOnly: "Read-only",
      tables: "Tables",
      schema: "Schema",
      data: "Data",
      sql: "SQL",
      history: "Query history",
      historyEmpty: "No queries yet. Run one from the SQL tab and it will show up here.",
      historyClear: "Clear history",
      historyReproduce: "Reproduce",
      historyReproduceHint: "Load into the SQL tab without running it",
      historySuccess: "OK",
      historyFailed: "Failed",
      historyRows: "{n} rows",
      historyChanges: "{n} rows affected",
      historyAgent: "Assistant",
      historyConsole: "Console",
      historyUnavailable: "Connection {name} is no longer selected for this conversation",
      historyOpen: "Open conversation",
      historyOpenFailed: "Could not open the conversation",
      historyOpenFailedDetail: "Could not open the conversation: {error}",
      historyTurn: "Turn {n}",
      historyManual: "Manual queries",
      historyTurnNoPrompt: "Untitled input",
      run: "Run",
      running: "Running…",
      searchTable: "Search tables…",
      noTables: "No tables in this database",
      rows: "rows",
      page: "Page {page}",
      prev: "Previous",
      next: "Next",
      pageSize: "Per page",
      loading: "Loading…",
      noRows: "No rows",
      nullValue: "NULL",
      test: "Test connection",
      testing: "Testing…",
      save: "Save",
      saving: "Saving…",
      cancel: "Cancel",
      edit: "Edit",
      remove: "Delete",
      removeTitle: "Delete connection",
      removeDesc: "The database itself is untouched; only this connection entry is removed.",
      confirmRemove: "Delete",
      name: "Name",
      kind: "Kind",
      file: "SQLite file path",
      fileHint: "~ paths are supported; a missing file is created.",
      host: "Host",
      port: "Port",
      database: "Database",
      user: "User",
      password: "Password",
      passwordKeep: "Saved — leave blank to keep",
      ssl: "Use SSL",
      advanced: "Advanced",
      readonlyConnection: "Read-only connection (writes disabled)",
      testOk: "Connected: {target}",
      testFail: "Connection failed: {error}",
      saveFailed: "Could not save: {error}",
      loadFailed: "Could not load: {error}",
      queryFailed: "Query failed: {error}",
      sqlHint: "Read-only SQL goes through db_query; INSERT / UPDATE / DELETE etc. go through db_execute and are confirmed by this click.",
      sqlPlaceholder: "SELECT * FROM users LIMIT 20;",
      result: "Result",
      affected: "{n} rows affected",
      truncated: "Result truncated",
      columns: "Columns",
      noConnection: "Choose a connection",
      selectTable: "Choose a table on the left",
      selectTableHint: "Browse data, inspect the schema, or run SQL.",
      driverMissing: "The {driver} driver is not installed; install it before using this connection kind.",
      demoNote: "Demo database: {path}",
      inChat: "Work with data in chat",
      inChatHint: "Try: “show me the last 10 orders in the demo database, sorted by total” or “change every Hangzhou user's city to Hangzhou-West Lake”.",
      sqlHistory: "Recent queries",
      clear: "Clear",
      copy: "Copy",
      copied: "Copied",
      close: "Close",
      table: "Table",
      view: "View",
      pk: "PK",
      notNull: "NOT NULL",
      defaultLabel: "default",
      dialect: "SQL dialect",
      notEditableDemo: "The demo connection can be browsed and modified. If deleted, recreate it from the empty state.",
      kindSqlite: "SQLite",
      kindPostgres: "PostgreSQL",
      kindMysql: "MySQL",
      tabsAria: "Database views",
      closeDialog: "Close dialog",
      rowIndex: "#",
      totalRows: "{n} rows",
      serverError: "Server error",
      needConnectionName: "Enter a connection name",
      needDatabase: "Enter a database name",
      needFile: "Enter a SQLite file path",
      unsupportedAction: "This action is not available in the current DSH version.",
      selectAll: "Select all",
      clearAll: "Clear",
      done: "Done",
      openPanel: "Open database panel",
      selectDatabase: "Select databases",
      noConnections: "No database connections yet",
      statusLabel: "Database connection status",
      tableCount: "{n} tables",
      statusFailed: "Connection failed",
      statusChecking: "Checking",
      noSelectionTitle: "No databases selected",
      noSelectionDesc: "Pick the databases this conversation should use in the multi-select beside the composer.",
      selectAllRecent: "Select recently used",
      openGlobal: "Open full panel",
      conversationEmptyTitle: "No database in this conversation",
      conversationEmptyDesc: "Create a connection, or start with the built-in demo database.",
      selected: "Selected",
      databases: "Databases",
      connectionCount: "{n} connections",
      databaseCount: "{n} databases",
      connectedOf: "{ok}/{n} connected",
      allConnected: "Connected",
      schemaHint: "Use Schema to inspect columns",
      askInChat: "Ask the assistant to query or change this data in chat",
      commandLabel: "Database",
      commandDesc: "Open the database panel"
    };

    function interpolate(text, params) {
      return String(text).replace(/\{(\w+)\}/g, function (_, key) {
        return params && params[key] !== undefined ? String(params[key]) : "{" + key + "}";
      });
    }

    // ── API ─────────────────────────────────────────────────────────────
    async function api(body) {
      var response;
      try {
        response = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      } catch (error) {
        throw new Error(error && error.message ? error.message : "network error");
      }
      var payload = null;
      try { payload = await response.json(); } catch (error) { payload = null; }
      if (!response.ok) throw new Error((payload && payload.error) || response.statusText || "HTTP " + response.status);
      if (!payload) throw new Error("empty response");
      if (payload.ok === false) throw new Error(payload.error || "request failed");
      return payload;
    }

    function fmtNumber(n) {
      var value = Number(n);
      return Number.isFinite(value) ? value.toLocaleString() : String(n);
    }

    function cellText(value) {
      if (value === null || value === undefined) return null;
      if (typeof value === "object") return JSON.stringify(value);
      return String(value);
    }

    /** Captured in apply(); lets any seat reach the global DB panel. */
    var APP_CTX = null;
    function openGlobalPanel() {
      var layout = APP_CTX && APP_CTX.get("layout");
      if (!layout || typeof layout.selectPanel !== "function") return false;
      try { layout.selectPanel("dbstudio"); return true; } catch (error) { return false; }
    }

    // ── per-session database state ──────────────────────────────────────
    //
    // The picker, the conversation tab and the status strip are three seats
    // over one host-owned answer. They share this small store so a checkbox
    // flips every surface at once; the host remains the authority and every
    // mutation round-trips through /dsh-db-studio/api.
    var SESSION_CACHE = new Map();
    var sessionListeners = new Map();

    function emptySessionEntry() {
      return { state: null, error: null, loading: false, status: null, statusLoading: false };
    }

    function sessionEntry(sessionId) {
      var entry = SESSION_CACHE.get(sessionId);
      if (!entry) {
        entry = emptySessionEntry();
        SESSION_CACHE.set(sessionId, entry);
      }
      return entry;
    }

    function notifySession(sessionId) {
      var entry = sessionEntry(sessionId);
      var listeners = sessionListeners.get(sessionId);
      if (!listeners) return;
      listeners.forEach(function (listener) {
        try { listener(entry); } catch (error) { /* a seat must not break the others */ }
      });
    }

    function subscribeSession(sessionId, listener) {
      var listeners = sessionListeners.get(sessionId);
      if (!listeners) {
        listeners = new Set();
        sessionListeners.set(sessionId, listeners);
      }
      listeners.add(listener);
      return function () {
        listeners.delete(listener);
        if (listeners.size === 0) sessionListeners.delete(sessionId);
      };
    }

    async function loadSessionState(sessionId, force) {
      if (!sessionId) return null;
      var entry = sessionEntry(sessionId);
      if (entry.loading && !force) return entry.state;
      entry.loading = true;
      notifySession(sessionId);
      try {
        var data = await api({ action: "session-state", sessionId: sessionId });
        entry.state = data;
        entry.error = null;
      } catch (error) {
        // An older host (one that predates per-conversation selection) does
        // not know session-state/session-set. Fall back to the global
        // overview so the picker, tab and status strip keep working; the
        // selection is then page-local until the host is restarted.
        try {
          var overview = await api({ action: "overview" });
          var all = overview.connections || [];
          entry.state = Object.assign({}, overview, {
            sessionId: sessionId,
            legacy: true,
            selectedIds: all.map(function (row) { return row.id; }),
            selected: all,
          });
          entry.error = null;
        } catch (fallbackError) {
          entry.error = error.message;
        }
      } finally {
        entry.loading = false;
        notifySession(sessionId);
      }
      return entry.state;
    }

    async function setSessionSelection(sessionId, ids) {
      var entry = sessionEntry(sessionId);
      var previous = entry.state;
      if (previous) {
        var selected = ids
          .map(function (id) {
            return (previous.connections || []).find(function (row) { return row.id === id; });
          })
          .filter(Boolean);
        entry.state = Object.assign({}, previous, { selectedIds: ids, selected: selected });
        entry.status = null;
        notifySession(sessionId);
      }
      if (previous && previous.legacy) {
        // Host has no session store yet: keep the page-local selection and
        // skip the round-trip that would fail with "unknown action".
        return entry.state;
      }
      try {
        var data = await api({ action: "session-set", sessionId: sessionId, ids: ids });
        entry.state = data;
        entry.error = null;
        entry.status = null;
        notifySession(sessionId);
        return data;
      } catch (error) {
        entry.state = previous;
        entry.error = error.message;
        notifySession(sessionId);
        throw error;
      }
    }

    async function loadSessionStatus(sessionId) {
      if (!sessionId) return null;
      var entry = sessionEntry(sessionId);
      if (entry.statusLoading) return entry.status;
      var selected = entry.state ? entry.state.selected || [] : [];
      entry.statusLoading = true;
      notifySession(sessionId);
      try {
        if (entry.state && entry.state.legacy) {
          // Legacy host: derive a light status from the tables action, which
          // every version of the plugin route understands.
          var rows = await Promise.all(selected.map(async function (connection) {
            var started = Date.now();
            try {
              var data = await api({ action: "tables", id: connection.id });
              return Object.assign({}, connection, {
                ok: true,
                latencyMs: Date.now() - started,
                tableCount: (data.tables || []).length,
              });
            } catch (error) {
              return Object.assign({}, connection, { ok: false, latencyMs: Date.now() - started, error: error.message });
            }
          }));
          entry.status = { sessionId: sessionId, checkedAt: Date.now(), connections: rows };
        } else {
          var data = await api({ action: "session-status", sessionId: sessionId });
          entry.status = data;
        }
      } catch (error) {
        entry.status = { connections: [], error: error.message };
      } finally {
        entry.statusLoading = false;
        notifySession(sessionId);
      }
      return entry.status;
    }

    function useSessionDb(sessionId) {
      var [entry, setEntry] = React.useState(function () {
        return Object.assign({}, sessionEntry(sessionId));
      });
      React.useEffect(function () {
        var alive = true;
        setEntry(Object.assign({}, sessionEntry(sessionId)));
        var unsubscribe = subscribeSession(sessionId, function (next) {
          if (alive) setEntry(Object.assign({}, next));
        });
        loadSessionState(sessionId);
        return function () {
          alive = false;
          unsubscribe();
        };
      }, [sessionId]);
      return entry;
    }

    function sessionKindLabel(kind) {
      return KIND_LABEL[kind] || kind;
    }

    function connectionSubtitle(connection) {
      if (!connection) return "";
      return connection.kind === "sqlite"
        ? (connection.file || "")
        : (connection.host + ":" + connection.port + "/" + (connection.database || ""));
    }

    function isReadOnlySql(sql) {
      return /^\s*\(?\s*(select|with|show|describe|desc|explain|pragma|values|table)\b/i.test(sql || "");
    }

    // ── icons ───────────────────────────────────────────────────────────
    function Svg(props) {
      return h("svg", {
        width: props.size || 16,
        height: props.size || 16,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: props.strokeWidth || 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        focusable: "false",
        style: props.style
      }, props.children);
    }
    function DatabaseIcon(props) {
      return h(Svg, props,
        h("ellipse", { cx: 12, cy: 5.5, rx: 7.5, ry: 3 }),
        h("path", { d: "M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" }),
        h("path", { d: "M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" })
      );
    }
    function TableIcon(props) {
      return h(Svg, props,
        h("rect", { x: 3.5, y: 4.5, width: 17, height: 15, rx: 2.5 }),
        h("path", { d: "M3.5 9.5h17M9.5 9.5v10M15 9.5v10" })
      );
    }
    function PlusIcon(props) { return h(Svg, props, h("path", { d: "M12 5v14M5 12h14" })); }
    function RefreshIcon(props) { return h(Svg, props, h("path", { d: "M20 11a8 8 0 1 0-2.3 5.7" }), h("path", { d: "M20 4v7h-7" })); }
    function TrashIcon(props) { return h(Svg, props, h("path", { d: "M4 7h16M9 7V4.5h6V7M6.5 7l.8 13h9.4l.8-13" }), h("path", { d: "M10 11v5M14 11v5" })); }
    function EditIcon(props) { return h(Svg, props, h("path", { d: "M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" }), h("path", { d: "M14.5 6.5l3 3" })); }
    function PlayIcon(props) { return h(Svg, props, h("path", { d: "M7 4.8v14.4L19.5 12 7 4.8Z" })); }
    function ChevronLeftIcon(props) { return h(Svg, props, h("path", { d: "M14.5 5.5 8 12l6.5 6.5" })); }
    function ChevronRightIcon(props) { return h(Svg, props, h("path", { d: "M9.5 5.5 16 12l-6.5 6.5" })); }
    function CloseIcon(props) { return h(Svg, props, h("path", { d: "M6 6l12 12M18 6 6 18" })); }
    function CheckIcon(props) { return h(Svg, props, h("path", { d: "M5 12.5 10 17.5 19 7" })); }
    function SearchIcon(props) { return h(Svg, props, h("circle", { cx: 11, cy: 11, r: 6.5 }), h("path", { d: "m16 16 4 4" })); }
    function HistoryIcon(props) { return h(Svg, props, h("circle", { cx: 12, cy: 12, r: 8 }), h("path", { d: "M12 7.5V12l3 2" })); }
    function SparkIcon(props) { return h(Svg, props, h("path", { d: "M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9 12 3.5Z" })); }
    function ChevronDownIcon(props) { return h(Svg, props, h("path", { d: "m6 9.5 6 6 6-6" })); }
    function CopyIcon(props) { return h(Svg, props, h("rect", { x: 8.5, y: 8.5, width: 11, height: 11, rx: 2 }), h("path", { d: "M15.5 5.5h-9a2 2 0 0 0-2 2v9" })); }
    function PlugIcon(props) { return h(Svg, props, h("path", { d: "M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0V8ZM12 17v4" })); }

    var KIND_ICON = { sqlite: DatabaseIcon, postgres: DatabaseIcon, mysql: DatabaseIcon };
    var KIND_LABEL = { sqlite: "SQLite", postgres: "PostgreSQL", mysql: "MySQL" };

    // ── styles ──────────────────────────────────────────────────────────
    var css = `
.dshdb-page{height:100%;min-height:0;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);box-sizing:border-box;padding-top:var(--dsh-frame-top-clearance,0px);overflow:hidden}
.dshdb-page *{box-sizing:border-box}
.dshdb-header{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:22px 28px 16px;flex:0 0 auto;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshdb-titlewrap{display:flex;align-items:center;gap:13px;min-width:0}
.dshdb-titlemark{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 12%,transparent);color:var(--dsw-alias-brand-primary);flex:0 0 auto}
.dshdb-title{font-size:20px;font-weight:600;line-height:1.25;letter-spacing:.01em;margin:0}
.dshdb-subtitle{font-size:12.5px;color:var(--dsw-alias-label-tertiary);margin:4px 0 0;line-height:1.4}
.dshdb-actions{display:flex;align-items:center;gap:8px;flex:0 0 auto}
.dshdb-btn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;line-height:1;padding:9px 12px;border-radius:9px;display:inline-flex;align-items:center;gap:7px;cursor:pointer;transition:background .15s ease,border-color .15s ease,color .15s ease}
.dshdb-btn:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshdb-btn:disabled{opacity:.5;cursor:default}
.dshdb-btn.primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.dshdb-btn.primary:hover{filter:brightness(1.06)}
.dshdb-btn.danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 35%,var(--dsw-alias-border-l2))}
.dshdb-btn.ghost{border-color:transparent;padding:8px}
.dshdb-btn.small{font-size:12px;padding:6px 9px;border-radius:7px}
.dshdb-iconbtn{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-tertiary);width:28px;height:28px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex:0 0 auto}
.dshdb-iconbtn:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshdb-body{flex:1 1 auto;min-height:0;display:flex}
.dshdb-sidebar{width:260px;flex:0 0 auto;border-right:1px solid var(--dsw-alias-border-l2);display:flex;flex-direction:column;min-height:0;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 55%,var(--dsw-alias-bg-base))}
.dshdb-sidehead{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 8px;color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.dshdb-connlist{flex:1 1 auto;overflow-y:auto;padding:0 8px 10px;min-height:0}
.dshdb-connrow{position:relative;display:flex;align-items:center;gap:9px;padding:9px 9px;border-radius:9px;cursor:pointer;border:1px solid transparent;transition:background .12s ease,border-color .12s ease}
.dshdb-connrow:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-connrow.active{background:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-border-l2);box-shadow:var(--dsw-elevation-prominent)}
.dshdb-connicon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent);color:var(--dsw-alias-brand-primary);flex:0 0 auto}
.dshdb-connmeta{min-width:0;flex:1 1 auto;display:flex;flex-direction:column;gap:2px}
.dshdb-connname{font-size:13px;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-conntarget{font-size:11px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:var(--dsw-font-family-mono,var(--dsw-font-family))}
.dshdb-connrow .dshdb-iconbtn{opacity:0}
.dshdb-connrow:hover .dshdb-iconbtn,.dshdb-connrow.active .dshdb-iconbtn{opacity:1}
.dshdb-badge{font-size:10px;font-weight:600;letter-spacing:.02em;padding:2px 5px;border-radius:4px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2);white-space:nowrap}
.dshdb-badge.demo{color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,transparent);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 9%,transparent)}
.dshdb-sidefoot{padding:10px 12px 12px;border-top:1px solid var(--dsw-alias-border-l2);font-size:11px;color:var(--dsw-alias-label-tertiary);line-height:1.5}
.dshdb-sidefoot code{font-size:10.5px;word-break:break-all;color:var(--dsw-alias-label-secondary)}
.dshdb-main{flex:1 1 auto;min-width:0;min-height:0;display:flex;flex-direction:column}
.dshdb-empty{flex:1;display:flex;align-items:center;justify-content:center;padding:32px}
.dshdb-emptycard{max-width:470px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px}
.dshdb-emptyart{width:84px;height:84px;border-radius:24px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent);color:var(--dsw-alias-brand-primary);margin-bottom:2px}
.dshdb-emptytitle{font-size:17px;font-weight:600;margin:0}
.dshdb-emptydesc{font-size:13px;line-height:1.65;color:var(--dsw-alias-label-tertiary);margin:0}
.dshdb-emptyactions{display:flex;gap:9px;margin-top:4px;flex-wrap:wrap;justify-content:center}
.dshdb-mainhead{flex:0 0 auto;padding:15px 24px 0;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshdb-mainheadtop{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}
.dshdb-activeconn{display:flex;align-items:center;gap:9px;min-width:0;flex:1 1 320px}
.dshdb-activeconnname{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-activeconntarget{font-size:11.5px;color:var(--dsw-alias-label-tertiary);font-family:var(--dsw-font-family-mono,var(--dsw-font-family));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.dshdb-tabs{display:flex;gap:2px;margin-top:14px}
.dshdb-tab{appearance:none;border:0;background:transparent;font:inherit;font-size:13px;color:var(--dsw-alias-label-tertiary);padding:9px 12px 10px;border-bottom:2px solid transparent;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.dshdb-tab:hover{color:var(--dsw-alias-label-primary)}
.dshdb-tab.active{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary);font-weight:550}
.dshdb-pane{flex:1 1 auto;min-height:0;display:flex}
.dshdb-tablelist{width:214px;flex:0 0 auto;border-right:1px solid var(--dsw-alias-border-l2);display:flex;flex-direction:column;min-height:0;background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 35%,var(--dsw-alias-bg-base))}
.dshdb-searchwrap{padding:11px 10px 7px;position:relative}
.dshdb-searchwrap svg{position:absolute;left:20px;top:20px;color:var(--dsw-alias-label-tertiary);pointer-events:none}
.dshdb-search{width:100%;appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:12.5px;border-radius:8px;padding:7px 9px 7px 30px;outline:none}
.dshdb-search:focus{border-color:var(--dsw-alias-brand-primary)}
.dshdb-tablelistscroll{flex:1 1 auto;overflow-y:auto;padding:2px 7px 10px;min-height:0}
.dshdb-tablerow{display:flex;align-items:center;gap:7px;width:100%;appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12.5px;text-align:left;padding:7px 8px;border-radius:7px;cursor:pointer}
.dshdb-tablerow:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshdb-tablerow.active{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 11%,transparent);color:var(--dsw-alias-brand-primary);font-weight:550}
.dshdb-tablerow span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-grid{flex:1 1 auto;min-width:0;min-height:0;display:flex;flex-direction:column}
.dshdb-gridbar{display:flex;align-items:center;gap:10px;justify-content:space-between;padding:11px 18px;border-bottom:1px solid var(--dsw-alias-border-l2);flex:0 0 auto;flex-wrap:wrap}
.dshdb-gridtitle{display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600;min-width:0}
.dshdb-gridmeta{font-size:11.5px;color:var(--dsw-alias-label-tertiary);font-weight:400}
.dshdb-gridtools{display:flex;align-items:center;gap:7px;flex:0 0 auto;flex-wrap:wrap;justify-content:flex-end}
.dshdb-schemaPanel{flex:0 0 auto;border-bottom:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 35%,var(--dsw-alias-bg-base));padding:10px 18px 12px;max-height:210px;overflow:auto}
.dshdb-cols{display:flex;flex-wrap:wrap;gap:6px}
.dshdb-col{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:3px 7px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary)}
.dshdb-col b{font-weight:600;color:var(--dsw-alias-label-primary)}
.dshdb-col em{font-style:normal;font-size:10px;color:var(--dsw-alias-label-tertiary)}
.dshdb-col.pk{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 40%,transparent);color:var(--dsw-alias-brand-primary)}
.dshdb-gridscroll{flex:1 1 auto;min-height:0;overflow:auto;padding:0 18px 12px}
.dshdb-table{border-collapse:separate;border-spacing:0;width:100%;font-size:12.5px}
.dshdb-table th{position:sticky;top:0;z-index:1;text-align:left;font-weight:600;font-size:11.5px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-bg-base);border-bottom:1px solid var(--dsw-alias-border-l2);padding:9px 10px;white-space:nowrap}
.dshdb-table th.idx{width:44px;color:var(--dsw-alias-label-caption);text-align:right}
.dshdb-table td{border-bottom:1px solid var(--dsw-alias-separator-primary);padding:8px 10px;vertical-align:top;max-width:340px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-table td.idx{color:var(--dsw-alias-label-caption);text-align:right;font-variant-numeric:tabular-nums;font-size:11px}
.dshdb-table tr:hover td{background:color-mix(in srgb,var(--dsw-alias-interactive-bg-hover) 55%,transparent)}
.dshdb-null{color:var(--dsw-alias-label-caption);font-style:italic;font-size:11.5px}
.dshdb-num{font-variant-numeric:tabular-nums;color:var(--dsw-alias-state-business-primary)}
.dshdb-pager{display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:9px 18px;border-top:1px solid var(--dsw-alias-border-l2);flex:0 0 auto;font-size:11.5px;color:var(--dsw-alias-label-tertiary)}
.dshdb-pager .dshdb-btn.small{padding:5px 8px}
.dshdb-pager select{appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;padding:4px 6px}
.dshdb-connselect,.dshdb-tableselect{display:none;appearance:none;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:12.5px;padding:7px 9px;max-width:230px}
.dshdb-sqlpane{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;padding:16px 20px;gap:12px;overflow:auto}
.dshdb-editorwrap{border:1px solid var(--dsw-alias-border-l2);border-radius:11px;overflow:hidden;background:var(--dsw-alias-bg-base);box-shadow:var(--dsw-elevation-prominent);flex:0 0 auto}
.dshdb-editortop{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-bottom:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 55%,var(--dsw-alias-bg-base));font-size:11px;color:var(--dsw-alias-label-tertiary)}
.dshdb-editor{display:block;width:100%;min-height:128px;max-height:260px;resize:vertical;border:0;outline:none;background:transparent;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12.5px;line-height:1.65;padding:12px 14px;tab-size:2}
.dshdb-editor:focus{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,transparent)}
.dshdb-sqlbar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.dshdb-hint{font-size:11.5px;color:var(--dsw-alias-label-tertiary);line-height:1.6;max-width:760px}
.dshdb-history{display:flex;gap:6px;flex-wrap:wrap}
.dshdb-history button{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-tertiary);font-family:var(--dsw-font-family-mono,monospace);font-size:10.5px;padding:3px 6px;border-radius:5px;cursor:pointer;max-width:300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-history button:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l3)}
.dshdb-result{flex:1 1 auto;min-height:160px;border:1px solid var(--dsw-alias-border-l2);border-radius:11px;overflow:hidden;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base)}
.dshdb-resulthead{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px;border-bottom:1px solid var(--dsw-alias-border-l2);font-size:12px;color:var(--dsw-alias-label-secondary);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 45%,var(--dsw-alias-bg-base));flex:0 0 auto}
.dshdb-resultbody{flex:1 1 auto;min-height:0;overflow:auto;padding:2px 10px 10px}
.dshdb-resultbody .dshdb-table th{background:var(--dsw-alias-bg-base)}
.dshdb-error{border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);color:var(--dsw-alias-state-error-primary);border-radius:9px;padding:10px 12px;font-size:12.5px;line-height:1.55;white-space:pre-wrap}
.dshdb-success{border:1px solid color-mix(in srgb,var(--dsw-alias-state-success-primary) 38%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent);color:var(--dsw-alias-state-success-primary);border-radius:9px;padding:10px 12px;font-size:12.5px;display:flex;align-items:center;gap:8px}
.dshdb-placeholder{flex:1;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary);font-size:13px;text-align:center;padding:30px;line-height:1.7}
.dshdb-loading{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--dsw-alias-label-tertiary)}
.dshdb-spinner{width:14px;height:14px;border-radius:50%;border:2px solid var(--dsw-alias-border-l3);border-top-color:var(--dsw-alias-brand-primary);animation:dshdb-spin .8s linear infinite}
@keyframes dshdb-spin{to{transform:rotate(360deg)}}
.dshdb-overlay{position:fixed;inset:0;z-index:60;background:rgba(20,22,28,.38);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:24px;animation:dshdb-fade .12s ease}
@keyframes dshdb-fade{from{opacity:0}to{opacity:1}}
.dshdb-dialog{width:min(560px,100%);max-height:calc(100vh - 80px);overflow:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2);border-radius:16px;box-shadow:0 24px 70px rgba(0,0,0,.28);padding:20px 20px 18px;font-family:var(--dsw-font-family)}
.dshdb-dialog.small{width:min(420px,100%)}
.dshdb-dialoghead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
.dshdb-dialogtitle{font-size:16px;font-weight:600;margin:0}
.dshdb-dialogdesc{font-size:12px;color:var(--dsw-alias-label-tertiary);margin:5px 0 0;line-height:1.55}
.dshdb-form{display:flex;flex-direction:column;gap:11px}
.dshdb-formrow{display:flex;flex-direction:column;gap:5px}
.dshdb-formgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.dshdb-label{font-size:11.5px;font-weight:550;color:var(--dsw-alias-label-secondary)}
.dshdb-input{appearance:none;width:100%;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;padding:8px 10px;outline:none}
.dshdb-input:focus{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 15%,transparent)}
.dshdb-input::placeholder{color:var(--dsw-alias-label-caption)}
.dshdb-hintline{font-size:11px;color:var(--dsw-alias-label-tertiary);line-height:1.45}
.dshdb-kinds{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.dshdb-kind{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12.5px;padding:9px 6px;border-radius:8px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px}
.dshdb-kind:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-kind.active{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent)}
.dshdb-kind small{font-size:9.5px;color:var(--dsw-alias-label-tertiary);font-weight:400}
.dshdb-check{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none}
.dshdb-check input{width:14px;height:14px;accent-color:var(--dsw-alias-brand-primary)}
.dshdb-dialogfoot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid var(--dsw-alias-border-l2)}
.dshdb-dialogfoot .right{display:flex;gap:8px;margin-left:auto}
.dshdb-testmsg{font-size:11.5px;line-height:1.5;padding:8px 10px;border-radius:8px;margin-top:2px}
.dshdb-testmsg.ok{color:var(--dsw-alias-state-success-primary);background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 8%,transparent)}
.dshdb-testmsg.bad{color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent)}
.dshdb-chatbar{flex:0 0 auto;display:flex;align-items:flex-start;gap:9px;padding:11px 18px;border-top:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 40%,var(--dsw-alias-bg-base));font-size:11.5px;color:var(--dsw-alias-label-tertiary);line-height:1.55}
.dshdb-chatbar svg{color:var(--dsw-alias-brand-primary);flex:0 0 auto;margin-top:1px}
.dshdb-chatbar b{color:var(--dsw-alias-label-secondary);font-weight:600}
@media (max-width:1100px){.dshdb-sidebar{width:220px}.dshdb-tablelist{width:180px}.dshdb-subtitle{display:none}}
@media (max-width:1240px){.dshdb-sidebar{display:none}.dshdb-connselect{display:inline-flex;align-items:center}.dshdb-activeconnname{display:none}.dshdb-tablelist{width:180px}.dshdb-header{padding:18px 20px 14px}.dshdb-mainhead{padding:14px 18px 0}.dshdb-gridbar{padding:10px 14px}.dshdb-gridscroll{padding:0 14px 12px}.dshdb-pager{padding:9px 14px}.dshdb-sqlpane{padding:14px 16px}.dshdb-chatbar{padding:10px 16px}}
@media (max-width:900px){.dshdb-tablelist{display:none}.dshdb-tableselect{display:inline-flex;align-items:center}.dshdb-actions .dshdb-btn .dshdb-btnlabel{display:none}.dshdb-activeconn{flex:1 1 100%}.dshdb-header{align-items:center}.dshdb-header .dshdb-subtitle{display:none}}

.dshdb-picker-wrap{position:relative;display:inline-flex;align-items:center;min-width:0;max-width:190px}
.dshdb-picker-btn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1;padding:6px 7px;border-radius:7px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;min-width:0;max-width:100%;transition:background .15s ease,border-color .15s ease,color .15s ease}
.dshdb-picker-btn:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshdb-picker-btn.has-selection{color:var(--dsw-alias-label-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 40%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-brand-primary) 7%,transparent)}
.dshdb-picker-btn.open{border-color:var(--dsw-alias-brand-primary)}
.dshdb-picker-btnlabel{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.dshdb-picker-count{font-size:9.5px;font-weight:600;background:var(--dsw-alias-brand-primary);color:#fff;border-radius:999px;padding:1px 4px;min-width:13px;text-align:center}
.dshdb-picker-pop{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:13px;box-shadow:0 18px 54px rgba(0,0,0,.25);padding:10px;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);animation:dshdb-pop .12s ease}
@keyframes dshdb-pop{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.dshdb-picker-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:2px 4px 6px}
.dshdb-picker-title{font-size:13px;font-weight:600}
.dshdb-picker-sub{font-size:10.5px;color:var(--dsw-alias-label-tertiary);margin-top:2px}
.dshdb-picker-headactions{display:flex;gap:2px;flex:0 0 auto}
.dshdb-picker-link{appearance:none;border:0;background:transparent;color:var(--dsw-alias-brand-primary);font:inherit;font-size:11px;padding:3px 5px;border-radius:5px;cursor:pointer;white-space:nowrap}
.dshdb-picker-link:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-picker-list{max-height:min(340px,50vh);overflow:auto;display:flex;flex-direction:column;gap:1px;margin:2px 0 4px}
.dshdb-picker-item{display:flex;align-items:center;gap:8px;padding:7px 7px;border-radius:7px;cursor:pointer;border:1px solid transparent}
.dshdb-picker-item:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-picker-item.checked{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 20%,transparent)}
.dshdb-picker-item input{width:13px;height:13px;accent-color:var(--dsw-alias-brand-primary);flex:0 0 auto;margin:0}
.dshdb-picker-icon{color:var(--dsw-alias-brand-primary);display:flex;flex:0 0 auto}
.dshdb-picker-meta{min-width:0;flex:1 1 auto;display:flex;flex-direction:column;gap:1px}
.dshdb-picker-name{font-size:12px;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-picker-target{font-size:10px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:var(--dsw-font-family-mono,var(--dsw-font-family))}
.dshdb-picker-empty{padding:16px 10px;display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;font-size:12px;color:var(--dsw-alias-label-tertiary);line-height:1.5}
.dshdb-picker-error{margin:4px 4px 0;color:var(--dsw-alias-state-error-primary);font-size:10.5px;line-height:1.4}
.dshdb-picker-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 2px 0;border-top:1px solid var(--dsw-alias-border-l2);margin-top:4px}
.dshdb-statusdock{display:flex;align-items:center;flex-wrap:nowrap;padding:0 4px 4px;max-width:min(300px,50vw);min-width:0;overflow:hidden;font-size:10.5px;line-height:1.35;color:var(--dsw-alias-label-tertiary)}
.dshdb-statuspill{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 65%,transparent);color:var(--dsw-alias-label-tertiary);font:inherit;font-size:10.5px;line-height:1.3;padding:2px 6px 2px 6px;border-radius:999px;display:inline-flex;align-items:center;gap:5px;min-width:0;max-width:100%;cursor:pointer;white-space:nowrap;overflow:hidden}
.dshdb-statuspill:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.dshdb-statuspill.open{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 35%,var(--dsw-alias-border-l2))}
.dshdb-statuspill-name{color:var(--dsw-alias-label-secondary);font-weight:550;font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
.dshdb-statuspill-meta{color:var(--dsw-alias-label-caption);font-size:9.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px}
.dshdb-statuspill.bad .dshdb-statuspill-meta{color:var(--dsw-alias-state-error-primary)}
.dshdb-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-label-caption);flex:0 0 auto}
.dshdb-dot.ok{background:var(--dsw-alias-state-success-primary)}
.dshdb-dot.bad{background:var(--dsw-alias-state-error-primary)}
.dshdb-dot.idle{background:var(--dsw-alias-label-caption)}
.dshdb-statuspop-head{padding:2px 4px 7px;border-bottom:1px solid var(--dsw-alias-border-l2);margin-bottom:5px}
.dshdb-statuspop-list{display:flex;flex-direction:column;gap:1px;max-height:min(300px,45vh);overflow:auto}
.dshdb-statuspop-row{display:flex;align-items:flex-start;gap:8px;padding:6px 7px;border-radius:7px}
.dshdb-statuspop-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-statuspop-meta{min-width:0;display:flex;flex-direction:column;gap:1px}
.dshdb-statuspop-name{font-size:12px;font-weight:550;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-statuspop-detail{font-size:10.5px;color:var(--dsw-alias-label-tertiary);line-height:1.4;word-break:break-word}
.dshdb-statuspop-row:has(.dshdb-dot.bad) .dshdb-statuspop-detail{color:var(--dsw-alias-state-error-primary)}
.dshdb-cv{height:100%;min-height:0;display:flex;flex-direction:column;padding:14px 22px 16px;box-sizing:border-box;overflow:hidden;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family);background:var(--dsw-alias-bg-base)}
/* The conversation shell gives a view an auto-height flex row; without bounding
   that ancestor the workbench grows with the table list and drags the data pane
   with it. Bounding it keeps the table list and the data grid on separate
   scroll ports, exactly like the global panel. */
*:has(> * > .dshdb-cv){flex:1 1 0!important;min-height:0!important;overflow:hidden!important}
.dshdb-cv *{box-sizing:border-box}
.dshdb-cvhead{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;flex:0 0 auto}
.dshdb-cvtitlewrap{display:flex;align-items:center;gap:10px;min-width:0}
.dshdb-cvtitle{font-size:16px;font-weight:600;margin:0;line-height:1.2}
.dshdb-cvsub{font-size:11px;color:var(--dsw-alias-label-tertiary);margin:3px 0 0}
.dshdb-cvactions{display:flex;align-items:center;gap:7px;flex:0 0 auto;flex-wrap:wrap;justify-content:flex-end}
.dshdb-cvpills{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:10px 0 0;flex:0 0 auto}
.dshdb-cvpill{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;padding:5px 8px;border-radius:999px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;max-width:230px}
.dshdb-cvpill:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshdb-cvpill.active{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 45%,transparent);color:var(--dsw-alias-brand-primary);background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent);font-weight:550}
.dshdb-cvpill.active .dshdb-dot{background:var(--dsw-alias-brand-primary)}
.dshdb-cvpillhint{font-size:10.5px;color:var(--dsw-alias-label-caption);margin-left:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.dshdb-cvbody{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-l2);border-radius:11px;overflow:hidden;margin-top:10px;background:var(--dsw-alias-bg-base)}
.dshdb-cvdata{flex:1 1 auto;min-height:0;display:flex}
.dshdb-cv .dshdb-tablelist{width:190px}
.dshdb-cv .dshdb-gridbar{padding:9px 12px}
.dshdb-cv .dshdb-gridscroll{padding:0 12px 8px}
.dshdb-cv .dshdb-pager{padding:7px 12px}
.dshdb-cv .dshdb-sqlpane{padding:12px 14px;gap:10px;height:100%}
.dshdb-cv .dshdb-tabs{margin-top:3px;flex:0 0 auto}
.dshdb-historypage{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;padding:14px 18px;gap:8px;overflow:hidden}
.dshdb-historypagehead{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 2px 8px;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshdb-historygroups{flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:4px 2px 6px}
.dshdb-historygroup{border:1px solid var(--dsw-alias-border-l2);border-radius:9px;overflow:hidden;background:var(--dsw-alias-bg-base)}
.dshdb-historygrouphead{appearance:none;border:0;border-bottom:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb,var(--dsw-alias-bg-layer-2) 38%,var(--dsw-alias-bg-base));color:var(--dsw-alias-label-primary);font:inherit;width:100%;text-align:left;display:flex;align-items:center;gap:9px;padding:9px 11px;cursor:pointer}
.dshdb-historygrouphead:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-historygroupmain{min-width:0;flex:1 1 auto;display:flex;flex-direction:column;gap:2px}
.dshdb-historygrouptitle{font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-historygroupcwd{font-size:10px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-historygroupcount{font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:999px;padding:1px 6px;flex:0 0 auto}
.dshdb-historyopen{display:inline-flex;align-items:center;gap:3px;font-size:10.5px;color:var(--dsw-alias-brand-primary);flex:0 0 auto}
.dshdb-historygrouprows{display:flex;flex-direction:column;gap:4px;padding:6px}
.dshdb-historypane{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;padding:12px 14px;gap:8px;overflow:hidden}
.dshdb-historybar{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:2px 2px 8px;border-bottom:1px solid var(--dsw-alias-border-l2)}
.dshdb-historytitle{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600}
.dshdb-historyturn{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;overflow:hidden;background:var(--dsw-alias-bg-base)}
.dshdb-historyturnhead{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;width:100%;text-align:left;display:flex;align-items:center;gap:7px;padding:7px 9px;cursor:pointer}
.dshdb-historyturnhead:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-historyturnlabel{font-size:11px;font-weight:600;flex:0 0 auto;white-space:nowrap}
.dshdb-historyturnprompt{font-size:11px;color:var(--dsw-alias-label-tertiary);min-width:0;flex:1 1 auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshdb-historyturncount{font-size:9.5px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover);border-radius:999px;padding:1px 6px;flex:0 0 auto}
.dshdb-historyturnrows{display:flex;flex-direction:column;gap:4px;padding:6px;border-top:1px solid var(--dsw-alias-border-l2)}
.dshdb-historylist{flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:8px 2px}
.dshdb-historyrow{display:flex;align-items:flex-start;gap:8px;width:100%;text-align:left;appearance:none;border:1px solid var(--dsw-alias-border-l2);background:transparent;border-radius:8px;padding:8px 9px;cursor:pointer;font:inherit;color:var(--dsw-alias-label-primary)}
.dshdb-historyrow:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshdb-historyrow.bad{border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 28%,var(--dsw-alias-border-l2))}
.dshdb-historystatus{display:flex;color:var(--dsw-alias-state-success-primary);flex:0 0 auto;margin-top:2px}
.dshdb-historyrow.bad .dshdb-historystatus{color:var(--dsw-alias-state-error-primary)}
.dshdb-historymain{min-width:0;flex:1 1 auto;display:flex;flex-direction:column;gap:3px}
.dshdb-historysql{font-family:var(--ds-font-family-code);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary)}
.dshdb-historymeta{display:flex;gap:7px;flex-wrap:wrap;font-size:10px;color:var(--dsw-alias-label-tertiary);line-height:1.4}
.dshdb-historyaction{display:inline-flex;align-items:center;gap:4px;flex:0 0 auto;font-size:10.5px;color:var(--dsw-alias-brand-primary);padding:2px 3px;white-space:nowrap}
.dshdb-cvempty{flex:1;display:flex;align-items:center;justify-content:center;padding:26px;min-height:300px}
.dshdb-cvloading{flex:1;display:flex;align-items:center;justify-content:center;min-height:300px}
.dshdb-cvmessage{padding:6px 0;flex:0 0 auto}
@media (max-width:1100px){.dshdb-statuspill-meta{display:none}.dshdb-statuspill-name{max-width:110px}}
@media (max-width:900px){.dshdb-cv{padding:12px 14px 14px}.dshdb-cv .dshdb-tablelist{display:none}.dshdb-cv .dshdb-tableselect{display:inline-flex}.dshdb-cvpillhint{display:none}.dshdb-picker-wrap{max-width:150px}}

`;

    /**
     * Register the stylesheet once; removing it on disposal keeps a disabled
     * plugin from leaking a sheet into the page.
     */
    function installStyles(ctx) {
      ctx.effect(function () {
        var tagId = "dsh-db-studio/client.css";
        if (typeof document === "undefined") return;
        var existing = document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]");
        if (existing) return function () {};
        var style = document.createElement("style");
        style.dataset.plugin = "dsh-db-studio";
        style.dataset.pluginCss = tagId;
        style.textContent = css;
        document.head.appendChild(style);
        return function () { style.remove(); };
      }, "dsh-db-studio: styles");
    }

    // ── small UI atoms ───────────────────────────────────────────────────
    function Spinner() {
      return h("span", { className: "dshdb-loading" }, h("span", { className: "dshdb-spinner" }), "…");
    }

    function IconButton(props) {
      return h("button", {
        type: "button",
        className: "dshdb-iconbtn",
        title: props.title,
        "aria-label": props.title,
        onClick: function (event) { event.stopPropagation(); if (props.onClick) props.onClick(event); },
        disabled: props.disabled
      }, props.children);
    }

    function KindBadge(props) {
      return h("span", { className: "dshdb-badge" + (props.demo ? " demo" : "") },
        props.demo ? props.t("demo") : KIND_LABEL[props.kind] || props.kind);
    }

    function EmptyState(props) {
      return h("div", { className: "dshdb-empty" },
        h("div", { className: "dshdb-emptycard" },
          h("div", { className: "dshdb-emptyart" }, h(DatabaseIcon, { size: 40 })),
          h("h2", { className: "dshdb-emptytitle" }, props.t("emptyTitle")),
          h("p", { className: "dshdb-emptydesc" }, props.t("emptyDesc")),
          h("div", { className: "dshdb-emptyactions" },
            props.onDemo ? h("button", { type: "button", className: "dshdb-btn", onClick: props.onDemo }, h(SparkIcon, { size: 15 }), props.t("useDemo")) : null,
            h("button", { type: "button", className: "dshdb-btn primary", onClick: props.onNew }, h(PlusIcon, { size: 15 }), props.t("newConnection"))
          )
        )
      );
    }

    function ConnectionRow(props) {
      var connection = props.connection;
      return h("div", {
        className: "dshdb-connrow" + (props.active ? " active" : ""),
        role: "button",
        tabIndex: 0,
        "aria-current": props.active ? "true" : undefined,
        onClick: function () { props.onSelect(connection.id); },
        onKeyDown: function (event) {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); props.onSelect(connection.id); }
        },
        title: connection.kind === "sqlite" ? connection.file : (connection.host + ":" + connection.port + "/" + connection.database)
      },
        h("span", { className: "dshdb-connicon" }, h(DatabaseIcon, { size: 16 })),
        h("span", { className: "dshdb-connmeta" },
          h("span", { className: "dshdb-connname" }, connection.name),
          h("span", { className: "dshdb-conntarget" }, connection.kind === "sqlite" ? connection.file : (connection.host + ":" + connection.port + "/" + connection.database))
        ),
        h(KindBadge, { kind: connection.kind, demo: connection.demo, t: props.t }),
        h(IconButton, { title: props.t("edit"), onClick: function () { props.onEdit(connection); } }, h(EditIcon, { size: 14 })),
        h(IconButton, { title: props.t("remove"), onClick: function () { props.onRemove(connection); } }, h(TrashIcon, { size: 14 }))
      );
    }

    // ── connection dialog ────────────────────────────────────────────────
    var BLANK_FORM = {
      kind: "sqlite",
      name: "",
      file: "",
      host: "127.0.0.1",
      port: "",
      database: "",
      user: "",
      password: "",
      ssl: false,
      readOnly: false
    };

    function connectionToForm(connection) {
      if (!connection) return Object.assign({}, BLANK_FORM);
      return {
        kind: connection.kind || "sqlite",
        name: connection.name || "",
        file: connection.file || "",
        host: connection.host || "127.0.0.1",
        port: connection.port ? String(connection.port) : "",
        database: connection.database || "",
        user: connection.user || "",
        password: "",
        ssl: connection.ssl === true,
        readOnly: connection.readOnly === true
      };
    }

    function ConnectionDialog(props) {
      var t = props.t;
      var [form, setForm] = React.useState(function () { return connectionToForm(props.connection); });
      var [testing, setTesting] = React.useState(false);
      var [saving, setSaving] = React.useState(false);
      var [testResult, setTestResult] = React.useState(null);
      var [error, setError] = React.useState(null);
      var editing = Boolean(props.connection && props.connection.id);

      function update(key, value) {
        setForm(function (previous) {
          var next = Object.assign({}, previous);
          next[key] = value;
          return next;
        });
        setTestResult(null);
        setError(null);
      }

      function payload() {
        var connection = {
          kind: form.kind,
          name: form.name.trim(),
          readOnly: form.readOnly
        };
        if (form.kind === "sqlite") {
          connection.file = form.file.trim();
        } else {
          connection.host = form.host.trim();
          connection.port = form.port.trim() ? Number(form.port) : undefined;
          connection.database = form.database.trim();
          connection.user = form.user.trim();
          connection.ssl = form.ssl;
          if (form.password) connection.password = form.password;
        }
        return connection;
      }

      function validate() {
        if (!form.name.trim()) return t("needConnectionName");
        if (form.kind === "sqlite" && !form.file.trim()) return t("needFile");
        if (form.kind !== "sqlite" && !form.database.trim()) return t("needDatabase");
        return null;
      }

      async function test() {
        var problem = validate();
        if (problem) { setError(problem); return; }
        setTesting(true);
        setError(null);
        try {
          var body = payload();
          if (editing) body.id = props.connection.id;
          var result = await api(Object.assign({ action: "test" }, { connection: body }));
          setTestResult({ ok: true, text: interpolate(t("testOk"), { target: result.target || "" }) });
        } catch (failure) {
          setTestResult({ ok: false, text: interpolate(t("testFail"), { error: failure.message }) });
        } finally {
          setTesting(false);
        }
      }

      async function save() {
        var problem = validate();
        if (problem) { setError(problem); return; }
        setSaving(true);
        setError(null);
        try {
          var result;
          if (editing) {
            result = await api({ action: "update", id: props.connection.id, patch: payload() });
          } else {
            result = await api({ action: "add", connection: payload() });
          }
          props.onSaved(result && result.connection ? result.connection : null);
        } catch (failure) {
          setError(interpolate(t("saveFailed"), { error: failure.message }));
        } finally {
          setSaving(false);
        }
      }

      function field(key, label, extra) {
        return h("label", { className: "dshdb-formrow" },
          h("span", { className: "dshdb-label" }, label),
          h("input", Object.assign({
            className: "dshdb-input",
            value: form[key],
            onChange: function (event) { update(key, event.target.value); }
          }, extra || {}))
        );
      }

      return h("div", { className: "dshdb-overlay", onMouseDown: function (event) { if (event.target === event.currentTarget) props.onClose(); } },
        h("div", { className: "dshdb-dialog", role: "dialog", "aria-modal": "true", "aria-label": editing ? t("edit") : t("newConnection") },
          h("div", { className: "dshdb-dialoghead" },
            h("div", null,
              h("h2", { className: "dshdb-dialogtitle" }, editing ? t("edit") : t("newConnection")),
              h("p", { className: "dshdb-dialogdesc" }, editing ? t("notEditableDemo") : t("emptyDesc"))
            ),
            h(IconButton, { title: t("closeDialog"), onClick: props.onClose }, h(CloseIcon, { size: 16 }))
          ),
          h("div", { className: "dshdb-form" },
            h("div", { className: "dshdb-formrow" },
              h("span", { className: "dshdb-label" }, t("kind")),
              h("div", { className: "dshdb-kinds" },
                ["sqlite", "postgres", "mysql"].map(function (kind) {
                  return h("button", {
                    key: kind,
                    type: "button",
                    className: "dshdb-kind" + (form.kind === kind ? " active" : ""),
                    onClick: function () {
                      update("kind", kind);
                      if (kind === "postgres" && !form.port) update("port", "5432");
                      if (kind === "mysql" && !form.port) update("port", "3306");
                    }
                  }, h(DatabaseIcon, { size: 17 }), KIND_LABEL[kind], h("small", { className: "dshdb-hintline" }, kind === "sqlite" ? "local file" : (kind === "postgres" ? "port 5432" : "port 3306")));
                })
              )
            ),
            field("name", t("name"), { placeholder: form.kind === "sqlite" ? "本地数据库" : "生产库（只读）" }),
            form.kind === "sqlite"
              ? h("label", { className: "dshdb-formrow" },
                  h("span", { className: "dshdb-label" }, t("file")),
                  h("input", { className: "dshdb-input", value: form.file, placeholder: "~/Documents/data.db", onChange: function (event) { update("file", event.target.value); } }),
                  h("span", { className: "dshdb-hintline" }, t("fileHint"))
                )
              : h("div", { className: "dshdb-formgrid" },
                  field("host", t("host"), { placeholder: "127.0.0.1" }),
                  field("port", t("port"), { placeholder: form.kind === "postgres" ? "5432" : "3306", inputMode: "numeric" }),
                  field("database", t("database"), { placeholder: "app" }),
                  field("user", t("user"), { placeholder: form.kind === "postgres" ? "postgres" : "root" })
                ),
            form.kind === "sqlite" ? null : field("password", t("password"), {
              type: "password",
              placeholder: typeof props.connection?.hasPassword === "boolean" && props.connection.hasPassword ? t("passwordKeep") : ""
            }),
            h("div", { className: "dshdb-formrow" },
              h("label", { className: "dshdb-check" },
                h("input", { type: "checkbox", checked: form.readOnly, onChange: function (event) { update("readOnly", event.target.checked); } }),
                t("readonlyConnection")
              )
            ),
            form.kind === "sqlite" ? null : h("div", { className: "dshdb-formrow" },
              h("label", { className: "dshdb-check" },
                h("input", { type: "checkbox", checked: form.ssl, onChange: function (event) { update("ssl", event.target.checked); } }),
                t("ssl")
              )
            ),
            error ? h("div", { className: "dshdb-error" }, error) : null,
            testResult ? h("div", { className: "dshdb-testmsg " + (testResult.ok ? "ok" : "bad") }, testResult.text) : null
          ),
          h("div", { className: "dshdb-dialogfoot" },
            h("button", { type: "button", className: "dshdb-btn", onClick: test, disabled: testing || saving },
              testing ? h(Spinner) : h(PlugIcon, { size: 14 }),
              testing ? t("testing") : t("test")
            ),
            h("div", { className: "right" },
              h("button", { type: "button", className: "dshdb-btn", onClick: props.onClose, disabled: saving }, t("cancel")),
              h("button", { type: "button", className: "dshdb-btn primary", onClick: save, disabled: saving || testing },
                saving ? h(Spinner) : h(CheckIcon, { size: 14 }),
                saving ? t("saving") : t("save")
              )
            )
          )
        )
      );
    }

    // ── data grid ───────────────────────────────────────────────────────
    function DataGrid(props) {
      var t = props.t;
      var result = props.result;
      var columns = result && result.columns ? result.columns : [];
      var rows = result && result.rows ? result.rows : [];
      var offset = result && result.offset ? result.offset : 0;
      if (!result) {
        return h("div", { className: "dshdb-placeholder" }, h("div", null, props.t("noRows")));
      }
      return h("div", { className: "dshdb-gridscroll" },
        h("table", { className: "dshdb-table" },
          h("thead", null, h("tr", null,
            h("th", { className: "idx" }, t("rowIndex")),
            columns.map(function (name) { return h("th", { key: name }, name); })
          )),
          h("tbody", null,
            rows.length === 0
              ? h("tr", null, h("td", { colSpan: columns.length + 1 }, h("span", { className: "dshdb-null" }, t("noRows"))))
              : rows.map(function (row, index) {
                  return h("tr", { key: index },
                    h("td", { className: "idx" }, fmtNumber(offset + index + 1)),
                    columns.map(function (name) {
                      var text = cellText(row ? row[name] : null);
                      var numeric = typeof text === "string" && /^-?\d+(\.\d+)?$/.test(text);
                      return h("td", { key: name, title: text === null ? "NULL" : text },
                        text === null ? h("span", { className: "dshdb-null" }, "NULL") : h("span", { className: numeric ? "dshdb-num" : "" }, text)
                      );
                    })
                  );
                })
          )
        )
      );
    }

    // ── main page ───────────────────────────────────────────────────────
    function DbStudioPage(props) {
      var t = props.t || function (key) { return key; };
      var [overview, setOverview] = React.useState(null);
      var [overviewError, setOverviewError] = React.useState(null);
      var [activeId, setActiveId] = React.useState(null);
      var [tables, setTables] = React.useState([]);
      var [tablesLoading, setTablesLoading] = React.useState(false);
      var [tableQuery, setTableQuery] = React.useState("");
      var [selectedTable, setSelectedTable] = React.useState(null);
      var [schema, setSchema] = React.useState(null);
      var [showSchema, setShowSchema] = React.useState(false);
      var [page, setPage] = React.useState(0);
      var [pageSize, setPageSize] = React.useState(50);
      var [result, setResult] = React.useState(null);
      var [rowsLoading, setRowsLoading] = React.useState(false);
      var [rowsError, setRowsError] = React.useState(null);
      var [tab, setTab] = React.useState("data");
      var [sql, setSql] = React.useState("");
      var [sqlResult, setSqlResult] = React.useState(null);
      var [sqlError, setSqlError] = React.useState(null);
      var [sqlLoading, setSqlLoading] = React.useState(false);
      var [sqlHistory, setSqlHistory] = React.useState([]);
      var [historyGroups, setHistoryGroups] = React.useState([]);
      var [historyLoading, setHistoryLoading] = React.useState(false);
      var [historyError, setHistoryError] = React.useState(null);
      var [sessionTitles, setSessionTitles] = React.useState({});
      var [dialog, setDialog] = React.useState(null);
      var [pendingDelete, setPendingDelete] = React.useState(null);
      var [busy, setBusy] = React.useState(false);

      var activeConnection = overview && overview.connections ? overview.connections.find(function (row) { return row.id === activeId; }) : null;

      React.useEffect(function () {
        var alive = true;
        setOverviewError(null);
        api({ action: "overview" }).then(function (data) {
          if (!alive) return;
          setOverview(data);
          setActiveId(function (current) {
            if (current && data.connections.some(function (row) { return row.id === current; })) return current;
            return data.connections.length ? data.connections[0].id : null;
          });
        }).catch(function (error) {
          if (alive) setOverviewError(interpolate(t("loadFailed"), { error: error.message }));
        });
        return function () { alive = false; };
      }, []);

      React.useEffect(function () {
        var sessions = APP_CTX && APP_CTX.get ? APP_CTX.get("sessions") : null;
        if (!sessions || !sessions.list) return;
        function update() {
          var snapshot = sessions.list.getSnapshot();
          setSessionTitles(snapshot && snapshot.byId ? snapshot.byId : {});
        }
        update();
        var off = sessions.list.subscribe ? sessions.list.subscribe(update) : null;
        return function () { if (typeof off === "function") off(); };
      }, []);

      React.useEffect(function () {
        if (tab === "history") loadAllHistory();
      }, [tab]);

      function loadAllHistory() {
        setHistoryLoading(true);
        setHistoryError(null);
        api({ action: "history-all" }).then(function (data) {
          setHistoryGroups(Array.isArray(data.sessions) ? data.sessions : []);
        }).catch(function (failure) {
          setHistoryError(interpolate(t("loadFailed"), { error: failure.message }));
        }).finally(function () { setHistoryLoading(false); });
      }

      function sessionLabel(sessionId) {
        var row = sessionTitles[sessionId];
        var title = row && (row.title || row.displayTitle);
        if (title && String(title).trim()) return String(title).trim();
        return String(sessionId || "").slice(0, 8);
      }

      function openConversation(sessionId) {
        var workspace = APP_CTX && APP_CTX.get ? APP_CTX.get("uiWorkspace") : null;
        if (!workspace || typeof workspace.openSession !== "function") {
          setHistoryError(t("historyOpenFailed"));
          return;
        }
        try {
          workspace.openSession(sessionId);
        } catch (failure) {
          setHistoryError(interpolate(t("historyOpenFailedDetail"), { error: failure.message }));
        }
      }

      React.useEffect(function () {
        if (!activeId) { setTables([]); setSelectedTable(null); setSchema(null); setResult(null); return; }
        var alive = true;
        setTablesLoading(true);
        setTables([]);
        setSelectedTable(null);
        setSchema(null);
        setResult(null);
        setRowsError(null);
        api({ action: "tables", id: activeId }).then(function (data) {
          if (!alive) return;
          var rows = data.tables || [];
          setTables(rows);
          if (rows.length) selectTable(rows[0].name, 0, true);
        }).catch(function (error) {
          if (alive) setTables([]);
        }).finally(function () { if (alive) setTablesLoading(false); });
        return function () { alive = false; };
      }, [activeId]);

      function selectConnection(id) {
        setActiveId(id);
        setTab("data");
        setSql("");
        setSqlResult(null);
        setSqlError(null);
        setPage(0);
      }

      function selectTable(name, nextPage, internal) {
        setSelectedTable(name);
        setPage(nextPage || 0);
        setRowsLoading(true);
        setRowsError(null);
        setResult(null);
        setShowSchema(false);
        if (!internal) setTab("data");
        var targetPage = nextPage || 0;
        Promise.all([
          api({ action: "describe", id: activeId, table: name }),
          api({ action: "rows", id: activeId, table: name, limit: pageSize, offset: targetPage * pageSize })
        ]).then(function (values) {
          setSchema(values[0]);
          setResult(values[1]);
        }).catch(function (error) {
          setRowsError(interpolate(t("loadFailed"), { error: error.message }));
        }).finally(function () { setRowsLoading(false); });
      }

      function reloadRows() {
        if (!selectedTable) return;
        setRowsLoading(true);
        setRowsError(null);
        api({ action: "rows", id: activeId, table: selectedTable, limit: pageSize, offset: page * pageSize }).then(function (data) {
          setResult(data);
        }).catch(function (error) {
          setRowsError(interpolate(t("loadFailed"), { error: error.message }));
        }).finally(function () { setRowsLoading(false); });
      }

      function changePage(nextPage) {
        if (!selectedTable || nextPage < 0) return;
        var maxPage = result && result.total ? Math.max(0, Math.ceil(result.total / pageSize) - 1) : 0;
        if (nextPage > maxPage) return;
        setPage(nextPage);
        setRowsLoading(true);
        setRowsError(null);
        api({ action: "rows", id: activeId, table: selectedTable, limit: pageSize, offset: nextPage * pageSize }).then(function (data) {
          setResult(data);
        }).catch(function (error) {
          setRowsError(interpolate(t("loadFailed"), { error: error.message }));
        }).finally(function () { setRowsLoading(false); });
      }

      function changePageSize(value) {
        var size = Number(value) || 50;
        setPageSize(size);
        if (!selectedTable) return;
        setPage(0);
        setRowsLoading(true);
        api({ action: "rows", id: activeId, table: selectedTable, limit: size, offset: 0 }).then(function (data) {
          setResult(data);
        }).catch(function (error) {
          setRowsError(interpolate(t("loadFailed"), { error: error.message }));
        }).finally(function () { setRowsLoading(false); });
      }

      function runSql() {
        var text = sql.trim();
        if (!text) return;
        setSqlLoading(true);
        setSqlError(null);
        setSqlResult(null);
        var readOnly = isReadOnlySql(text);
        var body = readOnly
          ? { action: "query", id: activeId, sql: text, limit: Number(overview?.config?.maxRows) || 200 }
          : { action: "execute", id: activeId, sql: text };
        api(body).then(function (data) {
          setSqlResult({ readOnly: readOnly, data: data });
          setSqlHistory(function (previous) {
            return [text].concat(previous.filter(function (item) { return item !== text; })).slice(0, 5);
          });
        }).catch(function (error) {
          setSqlError(interpolate(t("queryFailed"), { error: error.message }));
        }).finally(function () { setSqlLoading(false); });
      }

      function refreshTables() {
        if (!activeId) return;
        setBusy(true);
        api({ action: "tables", id: activeId }).then(function (data) {
          setTables(data.tables || []);
          if (!selectedTable && data.tables && data.tables.length) selectTable(data.tables[0].name, 0, true);
        }).catch(function () {}).finally(function () { setBusy(false); });
      }

      function reloadOverview(preserveActive) {
        return api({ action: "overview" }).then(function (data) {
          setOverview(data);
          if (preserveActive && data.connections.some(function (row) { return row.id === activeId; })) return;
          setActiveId(data.connections.length ? data.connections[0].id : null);
        });
      }

      async function saveDemo() {
        setBusy(true);
        try {
          var data = await api({ action: "seed-demo" });
          setOverview(data);
          setActiveId(data.connections.length ? data.connections[0].id : null);
        } catch (error) {
          setOverviewError(interpolate(t("loadFailed"), { error: error.message }));
        } finally {
          setBusy(false);
        }
      }

      async function removeConnection() {
        if (!pendingDelete) return;
        setBusy(true);
        try {
          await api({ action: "remove", id: pendingDelete.id });
          setPendingDelete(null);
          await reloadOverview(false);
        } catch (error) {
          setOverviewError(interpolate(t("saveFailed"), { error: error.message }));
          setPendingDelete(null);
        } finally {
          setBusy(false);
        }
      }

      function openNew() { setDialog({ mode: "new" }); }
      function openEdit(connection) { setDialog({ mode: "edit", connection: connection }); }

      var filteredTables = tableQuery.trim()
        ? tables.filter(function (row) { return row.name.toLowerCase().indexOf(tableQuery.trim().toLowerCase()) !== -1; })
        : tables;
      var total = result && result.total ? result.total : 0;
      var maxPage = Math.max(0, Math.ceil(total / pageSize) - 1);
      var missingDrivers = [];
      if (overview && overview.drivers) {
        if (!overview.drivers.postgres) missingDrivers.push("pg");
        if (!overview.drivers.mysql) missingDrivers.push("mysql2");
      }

      var header = h("header", { className: "dshdb-header" },
        h("div", { className: "dshdb-titlewrap" },
          h("div", { className: "dshdb-titlemark" }, h(DatabaseIcon, { size: 21 })),
          h("div", null,
            h("h1", { className: "dshdb-title" }, t("title")),
            h("p", { className: "dshdb-subtitle" }, t("subtitle"))
          )
        ),
        h("div", { className: "dshdb-actions" },
          h("button", { type: "button", className: "dshdb-btn ghost", title: t("refresh"), onClick: function () { reloadOverview(true); refreshTables(); }, disabled: busy }, h(RefreshIcon, { size: 15 })),
          h("button", { type: "button", className: "dshdb-btn primary", onClick: openNew }, h(PlusIcon, { size: 15 }), h("span", { className: "dshdb-btnlabel" }, t("newConnection")))
        )
      );

      var sidebar = h("aside", { className: "dshdb-sidebar" },
        h("div", { className: "dshdb-sidehead" },
          h("span", null, t("connections") + " · " + (overview ? overview.connections.length : 0)),
          h(IconButton, { title: t("newConnection"), onClick: openNew }, h(PlusIcon, { size: 14 }))
        ),
        h("div", { className: "dshdb-connlist" },
          overview && overview.connections.map(function (connection) {
            return h(ConnectionRow, {
              key: connection.id,
              connection: connection,
              active: connection.id === activeId,
              t: t,
              onSelect: selectConnection,
              onEdit: openEdit,
              onRemove: function (row) { setPendingDelete(row); }
            });
          })
        ),
        missingDrivers.length
          ? h("div", { className: "dshdb-sidefoot" }, missingDrivers.map(function (driver) {
              return h("div", { key: driver }, interpolate(t("driverMissing"), { driver: driver }));
            }))
          : null
      );

      var main = null;
      if (overviewError) {
        main = h("div", { className: "dshdb-empty" }, h("div", { className: "dshdb-emptycard" }, h("div", { className: "dshdb-error" }, overviewError)));
      } else if (!overview) {
        main = h("div", { className: "dshdb-empty" }, h(Spinner));
      } else if (!activeConnection) {
        main = h(EmptyState, { t: t, onNew: openNew, onDemo: overview.connections.length === 0 ? saveDemo : null });
      } else {
        var tableList = h("div", { className: "dshdb-tablelist" },
          h("div", { className: "dshdb-searchwrap" },
            h(SearchIcon, { size: 14 }),
            h("input", {
              className: "dshdb-search",
              value: tableQuery,
              placeholder: t("searchTable"),
              onChange: function (event) { setTableQuery(event.target.value); }
            })
          ),
          h("div", { className: "dshdb-tablelistscroll" },
            tablesLoading ? h("div", { className: "dshdb-placeholder" }, h(Spinner))
              : filteredTables.length === 0 ? h("div", { className: "dshdb-placeholder" }, t("noTables"))
              : filteredTables.map(function (row) {
                  return h("button", {
                    key: (row.schema || "") + "." + row.name,
                    type: "button",
                    className: "dshdb-tablerow" + (selectedTable === row.name ? " active" : ""),
                    onClick: function () { selectTable(row.name, 0); },
                    title: row.name
                  },
                    h(TableIcon, { size: 14 }),
                    h("span", null, row.name),
                    row.type === "view" ? h("span", { className: "dshdb-badge" }, t("view")) : null
                  );
                })
          )
        );

        var dataPane = h("div", { className: "dshdb-pane" },
          tableList,
          h("div", { className: "dshdb-grid" },
            h("div", { className: "dshdb-gridbar" },
              h("div", { className: "dshdb-gridtitle" },
                h(TableIcon, { size: 15 }),
                h("span", null, selectedTable || t("selectTable")),
                selectedTable ? h("span", { className: "dshdb-gridmeta" }, interpolate(t("totalRows"), { n: fmtNumber(total) })) : null
              ),
              h("div", { className: "dshdb-gridtools" },
                h("select", {
                  className: "dshdb-tableselect",
                  value: selectedTable || "",
                  "aria-label": t("tables"),
                  onChange: function (event) { if (event.target.value) selectTable(event.target.value, 0); }
                }, tables.map(function (row) {
                  var tableName = row.schema ? row.schema + "." + row.name : row.name;
                  return h("option", { key: tableName, value: tableName }, tableName);
                })),
                h("button", { type: "button", className: "dshdb-btn small", onClick: function () { setShowSchema(function (value) { return !value; }); }, disabled: !selectedTable },
                  h(ChevronDownIcon, { size: 13, style: { transform: showSchema ? "rotate(180deg)" : "none" } }), t("schema")),
                h(IconButton, { title: t("refresh"), onClick: reloadRows, disabled: !selectedTable }, h(RefreshIcon, { size: 14 }))
              )
            ),
            showSchema && schema ? h("div", { className: "dshdb-schemaPanel" },
              h("div", { className: "dshdb-cols" }, (schema.columns || []).map(function (column) {
                return h("span", { key: column.name, className: "dshdb-col" + (column.primaryKey ? " pk" : ""), title: column.type },
                  h("b", null, column.name),
                  h("em", null, column.type),
                  column.primaryKey ? h("em", null, t("pk")) : null,
                  column.notNull ? h("em", null, "NOT NULL") : null,
                  column.defaultValue !== null && column.defaultValue !== undefined ? h("em", null, "=" + String(column.defaultValue)) : null
                );
              }))
            ) : null,
            rowsError ? h("div", { className: "dshdb-sqlpane" }, h("div", { className: "dshdb-error" }, rowsError)) : null,
            rowsLoading ? h("div", { className: "dshdb-placeholder" }, h(Spinner)) : null,
            !rowsLoading && !rowsError && !selectedTable ? h("div", { className: "dshdb-placeholder" }, h("div", null, h("div", null, t("selectTable")), h("div", { className: "dshdb-gridmeta" }, t("selectTableHint")))) : null,
            !rowsLoading && !rowsError && selectedTable ? h(DataGrid, { t: t, result: result }) : null,
            selectedTable ? h("div", { className: "dshdb-pager" },
              h("span", null, interpolate(t("page"), { page: page + 1 }) + " / " + (maxPage + 1)),
              h("select", { value: pageSize, onChange: function (event) { changePageSize(event.target.value); }, "aria-label": t("pageSize") },
                [25, 50, 100, 200].map(function (size) { return h("option", { key: size, value: size }, size + " / " + t("pageSize")); })
              ),
              h("button", { type: "button", className: "dshdb-btn small", onClick: function () { changePage(page - 1); }, disabled: page <= 0 }, h(ChevronLeftIcon, { size: 13 })),
              h("button", { type: "button", className: "dshdb-btn small", onClick: function () { changePage(page + 1); }, disabled: page >= maxPage }, h(ChevronRightIcon, { size: 13 }))
            ) : null
          )
        );

        var sqlPane = h("div", { className: "dshdb-sqlpane" },
          h("div", { className: "dshdb-editorwrap" },
            h("div", { className: "dshdb-editortop" },
              h("span", null, (KIND_LABEL[activeConnection.kind] || activeConnection.kind) + " · " + (activeConnection.database || activeConnection.file || "")),
              h("span", null, "⌘ / Ctrl + Enter")
            ),
            h("textarea", {
              className: "dshdb-editor",
              value: sql,
              spellCheck: false,
              placeholder: t("sqlPlaceholder"),
              onChange: function (event) { setSql(event.target.value); },
              onKeyDown: function (event) {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); runSql(); }
              }
            })
          ),
          h("div", { className: "dshdb-sqlbar" },
            h("div", { className: "dshdb-hint" }, t("sqlHint")),
            h("div", { style: { display: "flex", gap: "7px", alignItems: "center" } },
              sql ? h("button", { type: "button", className: "dshdb-btn small ghost", onClick: function () { setSql(""); setSqlResult(null); setSqlError(null); } }, t("clear")) : null,
              h("button", { type: "button", className: "dshdb-btn primary", onClick: runSql, disabled: sqlLoading || !sql.trim() },
                sqlLoading ? h(Spinner) : h(PlayIcon, { size: 13 }),
                sqlLoading ? t("running") : t("run")
              )
            )
          ),
          sqlHistory.length ? h("div", { className: "dshdb-history" }, sqlHistory.map(function (item, index) {
            return h("button", { key: index, type: "button", title: item, onClick: function () { setSql(item); } }, item);
          })) : null,
          sqlError ? h("div", { className: "dshdb-error" }, sqlError) : null,
          sqlResult ? h("div", { className: "dshdb-result" },
            h("div", { className: "dshdb-resulthead" },
              h("span", null, t("result")),
              h("span", { className: "dshdb-gridmeta" },
                typeof sqlResult.data.elapsedMs === "number" ? sqlResult.data.elapsedMs + " ms" : "",
                sqlResult.data.truncated ? " · " + t("truncated") : ""
              )
            ),
            h("div", { className: "dshdb-resultbody" },
              sqlResult.readOnly
                ? h(DataGrid, { t: t, result: { columns: sqlResult.data.columns, rows: sqlResult.data.rows, offset: 0 } })
                : h("div", { style: { padding: "10px 4px" } },
                    h("div", { className: "dshdb-success" }, h(CheckIcon, { size: 15 }), interpolate(t("affected"), { n: sqlResult.data.changes ?? 0 })),
                    sqlResult.data.lastInsertRowid !== null && sqlResult.data.lastInsertRowid !== undefined && sqlResult.data.lastInsertRowid !== ""
                      ? h("div", { className: "dshdb-gridmeta", style: { marginTop: "8px" } }, "last insert id = " + sqlResult.data.lastInsertRowid)
                      : null
                  )
            )
          ) : h("div", { className: "dshdb-result" }, h("div", { className: "dshdb-placeholder" }, t("result")))
        );

        var historyPane = h("div", { className: "dshdb-historypage" },
          h("div", { className: "dshdb-historypagehead" },
            h("div", { className: "dshdb-historytitle" },
              h(HistoryIcon, { size: 14 }),
              t("history"),
              h("span", { className: "dshdb-gridmeta" },
                historyGroups.reduce(function (sum, group) { return sum + (group.entries ? group.entries.length : 0); }, 0))
            ),
            h("button", { type: "button", className: "dshdb-btn small ghost", disabled: historyLoading, onClick: loadAllHistory }, h(RefreshIcon, { size: 13 }), t("refresh"))
          ),
          historyError ? h("div", { className: "dshdb-cvmessage" }, h("div", { className: "dshdb-error" }, historyError)) : null,
          historyLoading
            ? h("div", { className: "dshdb-placeholder" }, h(Spinner))
            : historyGroups.length === 0
              ? h("div", { className: "dshdb-placeholder" }, t("historyEmpty"))
              : h("div", { className: "dshdb-historygroups" }, historyGroups.map(function (group) {
                  var rows = Array.isArray(group.entries) ? group.entries : [];
                  var folder = group.cwd ? String(group.cwd).split(/[\\/]/).filter(Boolean).pop() : "";
                  return h("div", { key: group.sessionId, className: "dshdb-historygroup" },
                    h("button", { type: "button", className: "dshdb-historygrouphead", onClick: function () { openConversation(group.sessionId); } },
                      h("span", { className: "dshdb-historygroupmain" },
                        h("span", { className: "dshdb-historygrouptitle" }, sessionLabel(group.sessionId)),
                        folder ? h("span", { className: "dshdb-historygroupcwd" }, folder) : null
                      ),
                      h("span", { className: "dshdb-historygroupcount" }, rows.length),
                      h("span", { className: "dshdb-historyopen" }, t("historyOpen"), h(ChevronRightIcon, { size: 11 }))
                    ),
                    h("div", { className: "dshdb-historygrouprows" }, rows.map(function (row) {
                      var ok = row.ok !== false;
                      var source = row.source === "agent" ? t("historyAgent") : t("historyConsole");
                      var count = row.changes != null
                        ? interpolate(t("historyChanges"), { n: fmtNumber(row.changes) })
                        : interpolate(t("historyRows"), { n: fmtNumber(row.rows || 0) });
                      return h("button", {
                        key: row.id,
                        type: "button",
                        className: "dshdb-historyrow" + (ok ? "" : " bad"),
                        title: (ok ? "" : (row.error || t("historyFailed")) + " · ") + t("historyOpen"),
                        onClick: function () { openConversation(group.sessionId); }
                      },
                        h("span", { className: "dshdb-historystatus" }, h(ok ? CheckIcon : CloseIcon, { size: 13 })),
                        h("span", { className: "dshdb-historymain" },
                          h("span", { className: "dshdb-historysql" }, row.sql),
                          h("span", { className: "dshdb-historymeta" },
                            h("span", null, row.connectionName || row.connectionId),
                            h("span", null, source),
                            h("span", null, new Date(row.at).toLocaleString()),
                            h("span", null, count)
                          )
                        )
                      );
                    }))
                  );
                }))
        );

        main = h("section", { className: "dshdb-main" },
          h("div", { className: "dshdb-mainhead" },
            h("div", { className: "dshdb-mainheadtop" },
              h("div", { className: "dshdb-activeconn" },
                h("select", {
                  className: "dshdb-connselect",
                  value: activeId || "",
                  "aria-label": t("connections"),
                  onChange: function (event) { selectConnection(event.target.value); }
                }, overview.connections.map(function (row) {
                  return h("option", { key: row.id, value: row.id }, row.name);
                })),
                h("span", { className: "dshdb-connicon" }, h(DatabaseIcon, { size: 16 })),
                h("div", { style: { minWidth: 0 } },
                  h("div", { className: "dshdb-activeconnname" }, activeConnection.name),
                  h("div", { className: "dshdb-activeconntarget" }, activeConnection.kind === "sqlite" ? activeConnection.file : (activeConnection.user + "@" + activeConnection.host + ":" + activeConnection.port + "/" + activeConnection.database))
                ),
                h(KindBadge, { kind: activeConnection.kind, demo: activeConnection.demo, t: t }),
                activeConnection.readOnly ? h("span", { className: "dshdb-badge" }, t("readOnly")) : null
              ),
              h("div", { className: "dshdb-gridtools" },
                h("button", { type: "button", className: "dshdb-btn small", onClick: function () { openEdit(activeConnection); } }, h(EditIcon, { size: 13 }), t("edit")),
                h("button", { type: "button", className: "dshdb-btn small danger", onClick: function () { setPendingDelete(activeConnection); } }, h(TrashIcon, { size: 13 }), t("remove"))
              )
            ),
            h("div", { className: "dshdb-tabs", role: "tablist", "aria-label": t("tabsAria") },
              h("button", { type: "button", role: "tab", "aria-selected": tab === "data", className: "dshdb-tab" + (tab === "data" ? " active" : ""), onClick: function () { setTab("data"); } }, h(TableIcon, { size: 14 }), t("data")),
              h("button", { type: "button", role: "tab", "aria-selected": tab === "sql", className: "dshdb-tab" + (tab === "sql" ? " active" : ""), onClick: function () { setTab("sql"); } }, h(PlayIcon, { size: 13 }), t("sql")),
              h("button", { type: "button", role: "tab", "aria-selected": tab === "history", className: "dshdb-tab" + (tab === "history" ? " active" : ""), onClick: function () { setTab("history"); } }, h(HistoryIcon, { size: 14 }), t("history"))
            )
          ),
          tab === "data" ? dataPane : tab === "sql" ? sqlPane : historyPane,
          tab === "history" ? null : h("div", { className: "dshdb-chatbar" },
            h(SparkIcon, { size: 14 }),
            h("div", null, h("b", null, t("inChat") + " · "), t("inChatHint"))
          )
        );
      }

      return h("div", { className: "dshdb-page" },
        header,
        h("div", { className: "dshdb-body" }, sidebar, main || h("div", { className: "dshdb-main" })),
        dialog ? h(ConnectionDialog, {
          t: t,
          connection: dialog.connection || null,
          onClose: function () { setDialog(null); },
          onSaved: function () { setDialog(null); reloadOverview(true); }
        }) : null,
        pendingDelete ? h("div", { className: "dshdb-overlay", onMouseDown: function (event) { if (event.target === event.currentTarget) setPendingDelete(null); } },
          h("div", { className: "dshdb-dialog small", role: "dialog", "aria-modal": "true" },
            h("div", { className: "dshdb-dialoghead" },
              h("div", null,
                h("h2", { className: "dshdb-dialogtitle" }, t("removeTitle")),
                h("p", { className: "dshdb-dialogdesc" }, "\"" + (pendingDelete.name || pendingDelete.id) + "\" — " + t("removeDesc"))
              ),
              h(IconButton, { title: t("close"), onClick: function () { setPendingDelete(null); } }, h(CloseIcon, { size: 16 }))
            ),
            h("div", { className: "dshdb-dialogfoot" },
              h("div", { className: "right" },
                h("button", { type: "button", className: "dshdb-btn", onClick: function () { setPendingDelete(null); } }, t("cancel")),
                h("button", { type: "button", className: "dshdb-btn danger", onClick: removeConnection, disabled: busy }, h(TrashIcon, { size: 14 }), t("confirmRemove"))
              )
            )
          )
        ) : null
      );
    }

    // ── composer: database multi-select ─────────────────────────────────
    /** Anchored popover used by the composer picker (portal when available). */
    function PickerPopover(props) {
      var rect = props.rect;
      if (!rect) return null;
      var viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      var viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      var width = Math.min(360, Math.max(280, viewportWidth - 24));
      var left = Math.min(Math.max(8, rect.left), Math.max(8, viewportWidth - width - 8));
      var bottom = Math.max(8, viewportHeight - rect.top + 8);
      var content = h("div", {
        className: "dshdb-picker-pop",
        role: "dialog",
        "aria-label": props.label,
        style: { position: "fixed", left: left, bottom: bottom, width: width, zIndex: 90 },
        onMouseDown: function (event) { event.stopPropagation(); },
        onClick: function (event) { event.stopPropagation(); }
      }, props.children);
      if (ReactDOM && typeof ReactDOM.createPortal === "function" && typeof document !== "undefined" && document.body) {
        return ReactDOM.createPortal(content, document.body);
      }
      return content;
    }

    function ConversationDbPicker(props) {
      var t = props.t;
      var sessionId = props.sessionId;
      var entry = useSessionDb(sessionId);
      var state = entry.state;
      var [open, setOpen] = React.useState(false);
      var [rect, setRect] = React.useState(null);
      var buttonRef = React.useRef(null);

      function measure() {
        var node = buttonRef.current;
        if (!node) return;
        var box = node.getBoundingClientRect();
        setRect({ left: box.left, top: box.top, width: box.width, height: box.height });
      }

      React.useEffect(function () {
        if (!open) return;
        measure();
        function update() { measure(); }
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return function () {
          window.removeEventListener("resize", update);
          window.removeEventListener("scroll", update, true);
        };
      }, [open]);

      React.useEffect(function () {
        if (!open) return;
        function onDown(event) {
          var target = event.target;
          if (target && target.closest && (target.closest(".dshdb-picker-pop") || target.closest(".dshdb-picker-wrap"))) return;
          setOpen(false);
        }
        function onKey(event) {
          if (event.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return function () {
          document.removeEventListener("mousedown", onDown);
          document.removeEventListener("keydown", onKey);
        };
      }, [open]);

      var all = state ? state.connections || [] : [];
      var selectedIds = state ? state.selectedIds || [] : [];
      var selected = state ? state.selected || [] : [];
      var count = selectedIds.length;
      var label = "选择数据库";
      if (selected.length === 1) label = selected[0].name;
      else if (selected.length > 1) label = interpolate(t("databaseCount"), { n: selected.length });
      else if (all.length === 0) label = "连接数据库";

      function toggle(id) {
        var next = selectedIds.includes(id)
          ? selectedIds.filter(function (item) { return item !== id; })
          : selectedIds.concat([id]);
        setSessionSelection(sessionId, next).catch(function () {});
      }

      function setAll(ids) {
        setSessionSelection(sessionId, ids).catch(function () {});
      }

      function openStudio() {
        setOpen(false);
        if (props.openStudio) props.openStudio();
        else openGlobalPanel();
      }

      var popover = open ? h(PickerPopover, {
        rect: rect,
        label: t("title")
      },
        h("div", { className: "dshdb-picker-head" },
          h("div", null,
            h("div", { className: "dshdb-picker-title" }, t("title")),
            h("div", { className: "dshdb-picker-sub" }, count + " / " + all.length)
          ),
          h("div", { className: "dshdb-picker-headactions" },
            h("button", { type: "button", className: "dshdb-picker-link", onClick: function () { setAll(all.map(function (row) { return row.id; })); } }, t("selectAll")),
            h("button", { type: "button", className: "dshdb-picker-link", onClick: function () { setAll([]); } }, t("clearAll"))
          )
        ),
        h("div", { className: "dshdb-picker-list" },
          all.length === 0
            ? h("div", { className: "dshdb-picker-empty" },
                h("div", null, t("noConnections")),
                h("button", { type: "button", className: "dshdb-btn primary", onClick: openStudio }, h(PlusIcon, { size: 14 }), t("newConnection")))
            : all.map(function (connection) {
                return h("label", { key: connection.id, className: "dshdb-picker-item" + (selectedIds.includes(connection.id) ? " checked" : "") },
                  h("input", {
                    type: "checkbox",
                    checked: selectedIds.includes(connection.id),
                    onChange: function () { toggle(connection.id); }
                  }),
                  h("span", { className: "dshdb-picker-icon" }, h(DatabaseIcon, { size: 15 })),
                  h("span", { className: "dshdb-picker-meta" },
                    h("span", { className: "dshdb-picker-name" }, connection.name),
                    h("span", { className: "dshdb-picker-target" }, sessionKindLabel(connection.kind) + " · " + connectionSubtitle(connection))
                  ),
                  connection.demo ? h("span", { className: "dshdb-badge demo" }, t("demo")) : null
                );
              })
        ),
        entry.error ? h("div", { className: "dshdb-picker-error" }, entry.error) : null,
        h("div", { className: "dshdb-picker-foot" },
          h("button", { type: "button", className: "dshdb-picker-link", onClick: openStudio }, t("openPanel")),
          h("button", { type: "button", className: "dshdb-btn small primary", onClick: function () { setOpen(false); } }, t("done"))
        )
      ) : null;

      return h("div", { className: "dshdb-picker-wrap" },
        h("button", {
          ref: buttonRef,
          type: "button",
          className: "dshdb-picker-btn" + (count > 0 ? " has-selection" : "") + (open ? " open" : ""),
          title: selected.length ? selected.map(function (row) { return row.name; }).join(", ") : t("selectDatabase"),
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          onMouseDown: function (event) { event.stopPropagation(); },
          onClick: function (event) { event.stopPropagation(); setOpen(function (value) { return !value; }); }
        },
          h(DatabaseIcon, { size: 14 }),
          h("span", { className: "dshdb-picker-btnlabel" }, label),
          h(ChevronDownIcon, { size: 11 })
        ),
        popover
      );
    }

    // ── composer: connection status strip ───────────────────────────────
    //
    // One pill, never a wrapping wall of chips: the composer dock already
    // shares its row with the shipped context/cost readouts, and a second or
    // third database used to make that row fold. The pill names the selection
    // (or its count) and opens a small popover with the per-connection detail.
    function ConversationDbStatus(props) {
      var t = props.t;
      var sessionId = props.sessionId;
      var entry = useSessionDb(sessionId);
      var state = entry.state;
      var selected = state ? state.selected || [] : [];
      var key = selected.map(function (row) { return row.id; }).join(",");
      var [open, setOpen] = React.useState(false);
      var [rect, setRect] = React.useState(null);
      var buttonRef = React.useRef(null);

      React.useEffect(function () {
        if (!selected.length) return;
        loadSessionStatus(sessionId);
        var timer = window.setInterval(function () { loadSessionStatus(sessionId); }, 30000);
        return function () { window.clearInterval(timer); };
      }, [sessionId, key]);

      React.useEffect(function () {
        if (!open) return;
        var node = buttonRef.current;
        if (node) {
          var box = node.getBoundingClientRect();
          setRect({ left: box.left, top: box.top, width: box.width, height: box.height });
        }
        function update() {
          var el = buttonRef.current;
          if (!el) return;
          var b = el.getBoundingClientRect();
          setRect({ left: b.left, top: b.top, width: b.width, height: b.height });
        }
        function onDown(event) {
          var target = event.target;
          if (target && target.closest && (target.closest(".dshdb-picker-pop") || target.closest(".dshdb-statusdock"))) return;
          setOpen(false);
        }
        function onKey(event) {
          if (event.key === "Escape") setOpen(false);
        }
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return function () {
          window.removeEventListener("resize", update);
          window.removeEventListener("scroll", update, true);
          document.removeEventListener("mousedown", onDown);
          document.removeEventListener("keydown", onKey);
        };
      }, [open]);

      if (!selected.length) return null;

      var statusById = {};
      ((entry.status && entry.status.connections) || []).forEach(function (row) { statusById[row.id] = row; });
      var checked = selected.map(function (connection) { return statusById[connection.id]; }).filter(Boolean);
      var failed = checked.filter(function (row) { return row.ok === false; }).length;
      var connected = checked.filter(function (row) { return row.ok === true; }).length;
      var checking = checked.length < selected.length || entry.statusLoading;
      var dotClass = failed > 0 ? " bad" : checking ? " idle" : " ok";

      var label;
      var meta;
      if (selected.length === 1) {
        var one = selected[0];
        var oneStatus = statusById[one.id];
        label = one.name;
        meta = sessionKindLabel(one.kind);
        if (oneStatus && oneStatus.ok === true && typeof oneStatus.tableCount === "number") meta += " · " + interpolate(t("tableCount"), { n: oneStatus.tableCount });
        else if (oneStatus && oneStatus.ok === false) meta += " · " + t("statusFailed");
        else if (checking) meta += " · " + t("statusChecking");
      } else {
        label = interpolate(t("databaseCount"), { n: selected.length });
        meta = failed > 0
          ? interpolate(t("connectedOf"), { ok: connected, n: selected.length })
          : checking ? t("statusChecking") : t("allConnected");
      }

      var title = selected.map(function (connection) {
        var status = statusById[connection.id];
        var text = connection.name + " · " + sessionKindLabel(connection.kind);
        if (status && status.ok === true && typeof status.tableCount === "number") text += " · " + interpolate(t("tableCount"), { n: status.tableCount });
        else if (status && status.ok === false) text += " · " + t("statusFailed");
        return text;
      }).join("\n");

      var popover = open ? h(PickerPopover, { rect: rect, label: t("statusLabel") },
        h("div", { className: "dshdb-statuspop-head" },
          h("div", { className: "dshdb-picker-title" }, t("statusLabel")),
          h("div", { className: "dshdb-picker-sub" }, interpolate(t("databaseCount"), { n: selected.length }))
        ),
        h("div", { className: "dshdb-statuspop-list" }, selected.map(function (connection) {
          var status = statusById[connection.id];
          var ok = status ? status.ok : undefined;
          var detail = sessionKindLabel(connection.kind);
          if (status && status.ok === true && typeof status.tableCount === "number") detail += " · " + interpolate(t("tableCount"), { n: status.tableCount }) + (typeof status.latencyMs === "number" ? " · " + status.latencyMs + " ms" : "");
          else if (status && status.ok === false) detail += " · " + (status.error || t("statusFailed"));
          else detail += " · " + t("statusChecking");
          return h("div", { key: connection.id, className: "dshdb-statuspop-row" },
            h("span", { className: "dshdb-dot" + (ok === false ? " bad" : ok === true ? " ok" : " idle") }),
            h("span", { className: "dshdb-statuspop-meta" },
              h("span", { className: "dshdb-statuspop-name" }, connection.name),
              h("span", { className: "dshdb-statuspop-detail" }, detail)
            )
          );
        })),
        h("div", { className: "dshdb-picker-foot" },
          h("button", { type: "button", className: "dshdb-picker-link", onClick: function () { setOpen(false); } }, t("done")),
          h("button", { type: "button", className: "dshdb-btn small primary", onClick: function () { setOpen(false); if (props.openStudio) props.openStudio(); else openGlobalPanel(); } }, t("openPanel"))
        )
      ) : null;

      return h("div", { className: "dshdb-statusdock", role: "status", "aria-label": t("statusLabel") },
        h("button", {
          ref: buttonRef,
          type: "button",
          className: "dshdb-statuspill" + dotClass + (open ? " open" : ""),
          title: title,
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          onMouseDown: function (event) { event.stopPropagation(); },
          onClick: function (event) { event.stopPropagation(); setOpen(function (value) { return !value; }); }
        },
          h("span", { className: "dshdb-dot" }),
          h("span", { className: "dshdb-statuspill-name" }, label),
          h("span", { className: "dshdb-statuspill-meta" }, meta),
          h(ChevronDownIcon, { size: 10 })
        ),
        popover
      );
    }

    /** Column chips shared by the global panel and the conversation tab. */
    function SchemaChips(props) {
      var t = props.t;
      var schema = props.schema;
      if (!schema || !schema.columns) return null;
      return h("div", { className: "dshdb-schemaPanel" },
        h("div", { className: "dshdb-cols" }, schema.columns.map(function (column) {
          return h("span", { key: column.name, className: "dshdb-col" + (column.primaryKey ? " pk" : ""), title: column.type },
            h("b", null, column.name),
            h("em", null, column.type),
            column.primaryKey ? h("em", null, t("pk")) : null,
            column.notNull ? h("em", null, "NOT NULL") : null,
            column.defaultValue !== null && column.defaultValue !== undefined ? h("em", null, "=" + String(column.defaultValue)) : null
          );
        }))
      );
    }

    /** Empty state shared by both "no connections" and "nothing selected". */
    function ConversationDbEmpty(props) {
      var t = props.t;
      return h("div", { className: "dshdb-cvempty" },
        h("div", { className: "dshdb-emptycard" },
          h("div", { className: "dshdb-emptyart" }, h(DatabaseIcon, { size: 38 })),
          h("h2", { className: "dshdb-emptytitle" }, props.title),
          h("p", { className: "dshdb-emptydesc" }, props.description),
          h("div", { className: "dshdb-emptyactions" },
            props.onDemo ? h("button", { type: "button", className: "dshdb-btn", onClick: props.onDemo, disabled: props.busy }, h(SparkIcon, { size: 15 }), t("useDemo")) : null,
            props.onSelectAll ? h("button", { type: "button", className: "dshdb-btn", onClick: props.onSelectAll }, h(CheckIcon, { size: 15 }), t("selectAllRecent")) : null,
            h("button", { type: "button", className: "dshdb-btn primary", onClick: props.onNew }, h(PlusIcon, { size: 15 }), t("newConnection")),
            props.onOpenPanel ? h("button", { type: "button", className: "dshdb-btn ghost", onClick: props.onOpenPanel }, t("openGlobal")) : null
          )
        )
      );
    }

    // ── conversation tab: the selected databases ────────────────────────
    function messageContentText(content) {
      if (typeof content === "string") return content;
      if (!Array.isArray(content)) return "";
      return content.map(function (block) {
        return block && block.type === "text" && typeof block.text === "string" ? block.text : "";
      }).join(" ").replace(/\s+/g, " ").trim();
    }

    /** Group recorded SQL by the loaded conversation turn whose time window contains it. */
    function sqlHistoryTurns(history, turns, nodes, t) {
      var loaded = (Array.isArray(turns) ? turns : []).map(function (item) {
        var node = nodes && typeof nodes.get === "function" ? nodes.get(item.anchorKey) : null;
        return {
          id: "turn-" + item.turn,
          turn: Number(item.turn) || 0,
          time: Number(node && node.data ? node.data.time : 0) || 0,
          prompt: item.prompt || "",
          entries: [],
        };
      });
      if (loaded.length === 0) return [{ id: "manual", index: 0, label: t("historyManual"), prompt: "", entries: history }];
      var groups = loaded.map(function (turn) {
        return { id: turn.id, index: 0, label: interpolate(t("historyTurn"), { n: turn.turn }), prompt: turn.prompt, time: turn.time, entries: [] };
      });
      var orphans = [];
      history.forEach(function (row) {
        var at = Number(row.at) || 0;
        var index = -1;
        for (var cursor = 0; cursor < loaded.length; cursor += 1) {
          if (loaded[cursor].time <= at) index = cursor;
          else break;
        }
        if (index < 0) orphans.push(row);
        else groups[index].entries.push(row);
      });
      var result = groups.filter(function (group) { return group.entries.length > 0; }).reverse();
      if (orphans.length) result.push({ id: "orphans", index: result.length, label: t("historyManual"), prompt: "", entries: orphans });
      result.forEach(function (group, index) { group.index = index; });
      return result;
    }

    function ConversationDbView(props) {
      var t = props.t || function (key) { return key; };
      var sessionId = props.sessionId;
      var entry = useSessionDb(sessionId);
      var state = entry.state;
      var all = state ? state.connections || [] : [];
      var selected = state ? state.selected || [] : [];
      var selectedKey = selected.map(function (row) { return row.id; }).join(",");

      var [activeId, setActiveId] = React.useState(null);
      var [tables, setTables] = React.useState([]);
      var [tablesLoading, setTablesLoading] = React.useState(false);
      var [tableQuery, setTableQuery] = React.useState("");
      var [selectedTable, setSelectedTable] = React.useState(null);
      var [schema, setSchema] = React.useState(null);
      var [showSchema, setShowSchema] = React.useState(false);
      var [page, setPage] = React.useState(0);
      var [pageSize, setPageSize] = React.useState(50);
      var [result, setResult] = React.useState(null);
      var [rowsLoading, setRowsLoading] = React.useState(false);
      var [rowsError, setRowsError] = React.useState(null);
      var [tab, setTab] = React.useState("data");
      var [sql, setSql] = React.useState("");
      var [sqlResult, setSqlResult] = React.useState(null);
      var [sqlError, setSqlError] = React.useState(null);
      var [sqlLoading, setSqlLoading] = React.useState(false);
      var [history, setHistory] = React.useState([]);
      var [historyLoading, setHistoryLoading] = React.useState(false);
      var [historyError, setHistoryError] = React.useState(null);
      var [collapsedTurns, setCollapsedTurns] = React.useState({});
      var fallbackUseChat = function () { return undefined; };
      var useChat = typeof props.useChat === "function" ? props.useChat : fallbackUseChat;
      var chatTurns = useChat(function (snapshot) { return snapshot.navigation ? snapshot.navigation.items() : undefined; });
      var chatNodes = useChat(function (snapshot) { return snapshot.nodes; });
      var turnGroups = sqlHistoryTurns(history, chatTurns, chatNodes, t);
      var [dialog, setDialog] = React.useState(null);
      var [busy, setBusy] = React.useState(false);
      var [error, setError] = React.useState(null);

      React.useEffect(function () {
        if (!selected.length) { setActiveId(null); return; }
        setActiveId(function (current) {
          if (current && selected.some(function (row) { return row.id === current; })) return current;
          return selected[0].id;
        });
      }, [selectedKey]);

      React.useEffect(function () {
        if (!activeId) {
          setTables([]);
          setSelectedTable(null);
          setSchema(null);
          setResult(null);
          return;
        }
        var alive = true;
        setTablesLoading(true);
        setTables([]);
        setSelectedTable(null);
        setSchema(null);
        setResult(null);
        setRowsError(null);
        api({ action: "tables", id: activeId, sessionId: sessionId }).then(function (data) {
          if (!alive) return;
          var rows = data.tables || [];
          setTables(rows);
          if (rows.length) selectTable(activeId, rows[0].name, 0, true);
        }).catch(function (failure) {
          if (alive) setRowsError(interpolate(t("loadFailed"), { error: failure.message }));
        }).finally(function () {
          if (alive) setTablesLoading(false);
        });
        return function () { alive = false; };
      }, [activeId, sessionId]);

      React.useEffect(function () {
        if (tab === "history") loadHistory();
      }, [tab, sessionId]);

      function loadHistory() {
        if (!sessionId) return;
        setHistoryLoading(true);
        setHistoryError(null);
        api({ action: "history-list", sessionId: sessionId }).then(function (data) {
          setHistory(Array.isArray(data.entries) ? data.entries : []);
        }).catch(function (failure) {
          setHistoryError(interpolate(t("loadFailed"), { error: failure.message }));
        }).finally(function () { setHistoryLoading(false); });
      }

      function clearHistory() {
        if (!sessionId) return;
        api({ action: "history-clear", sessionId: sessionId }).then(function () {
          setHistory([]);
        }).catch(function (failure) {
          setHistoryError(interpolate(t("saveFailed"), { error: failure.message }));
        });
      }

      function reproduceHistory(row) {
        var connection = selected.find(function (item) { return item.id === row.connectionId; });
        if (!connection) {
          setError(interpolate(t("historyUnavailable"), { name: row.connectionName || row.connectionId }));
          return;
        }
        setError(null);
        setActiveId(row.connectionId);
        setSql(row.sql || "");
        setSqlResult(null);
        setSqlError(null);
        setTab("sql");
      }

      function selectTable(connectionId, name, nextPage, internal) {
        setSelectedTable(name);
        setPage(nextPage || 0);
        setRowsLoading(true);
        setRowsError(null);
        setResult(null);
        setShowSchema(false);
        if (!internal) setTab("data");
        var target = nextPage || 0;
        Promise.all([
          api({ action: "describe", id: connectionId, table: name, sessionId: sessionId }),
          api({ action: "rows", id: connectionId, table: name, limit: pageSize, offset: target * pageSize, sessionId: sessionId })
        ]).then(function (values) {
          setSchema(values[0]);
          setResult(values[1]);
        }).catch(function (failure) {
          setRowsError(interpolate(t("loadFailed"), { error: failure.message }));
        }).finally(function () { setRowsLoading(false); });
      }

      function loadRows(nextPage, size) {
        if (!activeId || !selectedTable) return;
        var limit = size || pageSize;
        setRowsLoading(true);
        setRowsError(null);
        api({ action: "rows", id: activeId, table: selectedTable, limit: limit, offset: nextPage * limit, sessionId: sessionId }).then(function (data) {
          setResult(data);
        }).catch(function (failure) {
          setRowsError(interpolate(t("loadFailed"), { error: failure.message }));
        }).finally(function () { setRowsLoading(false); });
      }

      function changePage(nextPage) {
        if (nextPage < 0) return;
        var total = result && result.total ? result.total : 0;
        var maxPage = Math.max(0, Math.ceil(total / pageSize) - 1);
        if (nextPage > maxPage) return;
        setPage(nextPage);
        loadRows(nextPage);
      }

      function changePageSize(value) {
        var size = Number(value) || 50;
        setPageSize(size);
        setPage(0);
        loadRows(0, size);
      }

      function runSql() {
        var text = sql.trim();
        if (!text || !activeId) return;
        setSqlLoading(true);
        setSqlError(null);
        setSqlResult(null);
        var readOnly = isReadOnlySql(text);
        var body = readOnly
          ? { action: "query", id: activeId, sql: text, limit: Number(state && state.config && state.config.maxRows) || 200, sessionId: sessionId }
          : { action: "execute", id: activeId, sql: text, sessionId: sessionId };
        api(body).then(function (data) {
          setSqlResult({ readOnly: readOnly, data: data });
        }).catch(function (failure) {
          setSqlError(interpolate(t("queryFailed"), { error: failure.message }));
        }).finally(function () {
          setSqlLoading(false);
          loadHistory();
        });
      }

      async function openDemo() {
        setBusy(true);
        setError(null);
        try {
          var data = await api({ action: "seed-demo" });
          await loadSessionState(sessionId, true);
          var current = sessionEntry(sessionId).state;
          var ids = current ? current.selectedIds || [] : [];
          var demo = (data.connections || []).find(function (row) { return row.demo; });
          if (demo && !ids.includes(demo.id)) ids = ids.concat([demo.id]);
          if (demo) {
            await setSessionSelection(sessionId, ids);
            setActiveId(demo.id);
          } else {
            await setSessionSelection(sessionId, ids);
          }
        } catch (failure) {
          setError(interpolate(t("loadFailed"), { error: failure.message }));
        } finally {
          setBusy(false);
        }
      }

      function selectAllRecent() {
        setSessionSelection(sessionId, all.map(function (row) { return row.id; })).catch(function (failure) {
          setError(interpolate(t("saveFailed"), { error: failure.message }));
        });
      }

      async function onConnectionSaved(saved) {
        setDialog(null);
        try {
          await loadSessionState(sessionId, true);
          var current = sessionEntry(sessionId).state;
          var ids = current ? current.selectedIds || [] : [];
          if (saved && saved.id && !ids.includes(saved.id)) ids = ids.concat([saved.id]);
          await setSessionSelection(sessionId, ids);
          if (saved && saved.id) setActiveId(saved.id);
        } catch (failure) {
          setError(interpolate(t("saveFailed"), { error: failure.message }));
        }
      }

      if (!state) {
        return h("div", { className: "dshdb-cv" },
          h("div", { className: "dshdb-cvloading" }, entry.error ? h("div", { className: "dshdb-error" }, entry.error) : h(Spinner)));
      }

      var dialogNode = dialog ? h(ConnectionDialog, {
        t: t,
        connection: dialog.connection || null,
        onClose: function () { setDialog(null); },
        onSaved: onConnectionSaved
      }) : null;

      if (all.length === 0) {
        return h("div", { className: "dshdb-cv" },
          error ? h("div", { className: "dshdb-cvmessage" }, h("div", { className: "dshdb-error" }, error)) : null,
          h(ConversationDbEmpty, {
            t: t,
            title: t("conversationEmptyTitle"),
            description: t("conversationEmptyDesc"),
            busy: busy,
            onDemo: openDemo,
            onNew: function () { setDialog({ mode: "new" }); },
            onOpenPanel: openGlobalPanel
          }),
          dialogNode
        );
      }

      if (selected.length === 0) {
        return h("div", { className: "dshdb-cv" },
          error ? h("div", { className: "dshdb-cvmessage" }, h("div", { className: "dshdb-error" }, error)) : null,
          h(ConversationDbEmpty, {
            t: t,
            title: t("noSelectionTitle"),
            description: t("noSelectionDesc"),
            busy: busy,
            onSelectAll: selectAllRecent,
            onNew: function () { setDialog({ mode: "new" }); },
            onOpenPanel: openGlobalPanel
          }),
          dialogNode
        );
      }

      var active = selected.find(function (row) { return row.id === activeId; }) || selected[0];
      var filteredTables = tableQuery.trim()
        ? tables.filter(function (row) { return row.name.toLowerCase().indexOf(tableQuery.trim().toLowerCase()) !== -1; })
        : tables;
      var total = result && result.total ? result.total : 0;
      var maxPage = Math.max(0, Math.ceil(total / pageSize) - 1);

      var tableList = h("div", { className: "dshdb-tablelist" },
        h("div", { className: "dshdb-searchwrap" },
          h(SearchIcon, { size: 14 }),
          h("input", {
            className: "dshdb-search",
            value: tableQuery,
            placeholder: t("searchTable"),
            onChange: function (event) { setTableQuery(event.target.value); }
          })
        ),
        h("div", { className: "dshdb-tablelistscroll" },
          tablesLoading ? h("div", { className: "dshdb-placeholder" }, h(Spinner))
            : filteredTables.length === 0 ? h("div", { className: "dshdb-placeholder" }, t("noTables"))
            : filteredTables.map(function (row) {
                var tableName = row.schema ? row.schema + "." + row.name : row.name;
                return h("button", {
                  key: tableName,
                  type: "button",
                  className: "dshdb-tablerow" + (selectedTable === tableName ? " active" : ""),
                  onClick: function () { selectTable(active.id, tableName, 0); },
                  title: tableName
                }, h(TableIcon, { size: 14 }), h("span", null, row.name));
              })
        )
      );

      var dataPane = h("div", { className: "dshdb-cvdata" },
        tableList,
        h("div", { className: "dshdb-grid" },
          h("div", { className: "dshdb-gridbar" },
            h("div", { className: "dshdb-gridtitle" },
              h(TableIcon, { size: 15 }),
              h("span", null, selectedTable || t("selectTable")),
              selectedTable ? h("span", { className: "dshdb-gridmeta" }, interpolate(t("totalRows"), { n: fmtNumber(total) })) : null
            ),
            h("div", { className: "dshdb-gridtools" },
              h("select", {
                className: "dshdb-tableselect",
                value: selectedTable || "",
                "aria-label": t("tables"),
                onChange: function (event) { if (event.target.value) selectTable(active.id, event.target.value, 0); }
              }, tables.map(function (row) {
                var tableName = row.schema ? row.schema + "." + row.name : row.name;
                return h("option", { key: tableName, value: tableName }, tableName);
              })),
              h("button", { type: "button", className: "dshdb-btn small", disabled: !selectedTable, onClick: function () { setShowSchema(function (value) { return !value; }); } },
                h(ChevronDownIcon, { size: 13, style: { transform: showSchema ? "rotate(180deg)" : "none" } }), t("schema")),
              h(IconButton, { title: t("refresh"), disabled: !selectedTable, onClick: function () { if (selectedTable) selectTable(active.id, selectedTable, page, true); } }, h(RefreshIcon, { size: 14 }))
            )
          ),
          showSchema && schema ? h(SchemaChips, { t: t, schema: schema }) : null,
          rowsError ? h("div", { className: "dshdb-cvmessage" }, h("div", { className: "dshdb-error" }, rowsError)) : null,
          rowsLoading ? h("div", { className: "dshdb-placeholder" }, h(Spinner)) : null,
          !rowsLoading && !rowsError && !selectedTable ? h("div", { className: "dshdb-placeholder" }, h("div", null, h("div", null, t("selectTable")), h("div", { className: "dshdb-gridmeta" }, t("selectTableHint")))) : null,
          !rowsLoading && !rowsError && selectedTable ? h(DataGrid, { t: t, result: result }) : null,
          selectedTable ? h("div", { className: "dshdb-pager" },
            h("span", null, interpolate(t("page"), { page: page + 1 }) + " / " + (maxPage + 1)),
            h("select", { value: pageSize, onChange: function (event) { changePageSize(event.target.value); }, "aria-label": t("pageSize") },
              [25, 50, 100, 200].map(function (size) { return h("option", { key: size, value: size }, size + " / " + t("pageSize")); })
            ),
            h("button", { type: "button", className: "dshdb-btn small", onClick: function () { changePage(page - 1); }, disabled: page <= 0 }, h(ChevronLeftIcon, { size: 13 })),
            h("button", { type: "button", className: "dshdb-btn small", onClick: function () { changePage(page + 1); }, disabled: page >= maxPage }, h(ChevronRightIcon, { size: 13 }))
          ) : null
        )
      );

      var sqlPane = h("div", { className: "dshdb-sqlpane" },
        h("div", { className: "dshdb-editorwrap" },
          h("div", { className: "dshdb-editortop" },
            h("span", null, sessionKindLabel(active.kind) + " · " + (active.database || active.file || "")),
            h("span", null, "⌘ / Ctrl + Enter")
          ),
          h("textarea", {
            className: "dshdb-editor",
            value: sql,
            spellCheck: false,
            placeholder: t("sqlPlaceholder"),
            onChange: function (event) { setSql(event.target.value); },
            onKeyDown: function (event) {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); runSql(); }
            }
          })
        ),
        h("div", { className: "dshdb-sqlbar" },
          h("div", { className: "dshdb-hint" }, t("sqlHint")),
          h("div", { style: { display: "flex", gap: "7px", alignItems: "center" } },
            sql ? h("button", { type: "button", className: "dshdb-btn small ghost", onClick: function () { setSql(""); setSqlResult(null); setSqlError(null); } }, t("clear")) : null,
            h("button", { type: "button", className: "dshdb-btn primary", onClick: runSql, disabled: sqlLoading || !sql.trim() },
              sqlLoading ? h(Spinner) : h(PlayIcon, { size: 13 }),
              sqlLoading ? t("running") : t("run")
            )
          )
        ),
        sqlError ? h("div", { className: "dshdb-error" }, sqlError) : null,
        sqlResult ? h("div", { className: "dshdb-result" },
          h("div", { className: "dshdb-resulthead" },
            h("span", null, t("result")),
            h("span", { className: "dshdb-gridmeta" },
              typeof sqlResult.data.elapsedMs === "number" ? sqlResult.data.elapsedMs + " ms" : "",
              sqlResult.data.truncated ? " · " + t("truncated") : ""
            )
          ),
          h("div", { className: "dshdb-resultbody" },
            sqlResult.readOnly
              ? h(DataGrid, { t: t, result: { columns: sqlResult.data.columns, rows: sqlResult.data.rows, offset: 0 } })
              : h("div", { style: { padding: "10px 4px" } },
                  h("div", { className: "dshdb-success" }, h(CheckIcon, { size: 15 }), interpolate(t("affected"), { n: sqlResult.data.changes ?? 0 })))
          )
        ) : h("div", { className: "dshdb-result" }, h("div", { className: "dshdb-placeholder" }, t("result")))
      );

      var historyPane = h("div", { className: "dshdb-historypane" },
        h("div", { className: "dshdb-historybar" },
          h("div", { className: "dshdb-historytitle" },
            h(HistoryIcon, { size: 14 }),
            t("history"),
            h("span", { className: "dshdb-gridmeta" }, history.length)
          ),
          h("button", {
            type: "button",
            className: "dshdb-btn small ghost",
            disabled: historyLoading || history.length === 0,
            onClick: clearHistory
          }, h(TrashIcon, { size: 13 }), t("historyClear"))
        ),
        historyError ? h("div", { className: "dshdb-cvmessage" }, h("div", { className: "dshdb-error" }, historyError)) : null,
        historyLoading
          ? h("div", { className: "dshdb-placeholder" }, h(Spinner))
          : history.length === 0
            ? h("div", { className: "dshdb-placeholder" }, t("historyEmpty"))
            : h("div", { className: "dshdb-historylist" }, turnGroups.map(function (group) {
                var collapsed = collapsedTurns[group.id] !== undefined ? collapsedTurns[group.id] : group.index > 0;
                return h("div", { key: group.id, className: "dshdb-historyturn" },
                  h("button", {
                    type: "button",
                    className: "dshdb-historyturnhead",
                    "aria-expanded": !collapsed,
                    onClick: function () {
                      setCollapsedTurns(function (previous) {
                        var next = Object.assign({}, previous);
                        next[group.id] = !collapsed;
                        return next;
                      });
                    }
                  },
                    h(ChevronDownIcon, { size: 13, style: { transform: collapsed ? "rotate(-90deg)" : "none", transition: "transform .12s ease" } }),
                    h("span", { className: "dshdb-historyturnlabel" }, group.label),
                    group.prompt ? h("span", { className: "dshdb-historyturnprompt", title: group.prompt }, group.prompt) : null,
                    h("span", { className: "dshdb-historyturncount" }, group.entries.length)
                  ),
                  collapsed ? null : h("div", { className: "dshdb-historyturnrows" }, group.entries.map(function (row) {
                    var ok = row.ok !== false;
                    var source = row.source === "agent" ? t("historyAgent") : t("historyConsole");
                    var count = row.changes != null
                      ? interpolate(t("historyChanges"), { n: fmtNumber(row.changes) })
                      : interpolate(t("historyRows"), { n: fmtNumber(row.rows || 0) });
                    return h("button", {
                      key: row.id,
                      type: "button",
                      className: "dshdb-historyrow" + (ok ? "" : " bad"),
                      title: ok ? t("historyReproduceHint") : (row.error || t("historyFailed")),
                      onClick: function () { reproduceHistory(row); }
                    },
                      h("span", { className: "dshdb-historystatus" }, h(ok ? CheckIcon : CloseIcon, { size: 13 })),
                      h("span", { className: "dshdb-historymain" },
                        h("span", { className: "dshdb-historysql" }, row.sql),
                        h("span", { className: "dshdb-historymeta" },
                          h("span", null, row.connectionName || row.connectionId),
                          h("span", null, source),
                          h("span", null, new Date(row.at).toLocaleString()),
                          h("span", null, count)
                        )
                      ),
                      h("span", { className: "dshdb-historyaction" }, h(PlayIcon, { size: 11 }), t("historyReproduce"))
                    );
                  }))
                );
              }))
      );

      return h("div", { className: "dshdb-cv" },
        h("div", { className: "dshdb-cvhead" },
          h("div", { className: "dshdb-cvtitlewrap" },
            h("div", { className: "dshdb-titlemark" }, h(DatabaseIcon, { size: 20 })),
            h("div", null,
              h("h2", { className: "dshdb-cvtitle" }, t("title")),
              h("p", { className: "dshdb-cvsub" }, interpolate(t("connectionCount"), { n: selected.length }))
            )
          ),
          h("div", { className: "dshdb-cvactions" },
            h("button", { type: "button", className: "dshdb-btn small", onClick: function () { selectTable(active.id, selectedTable, page, true); } }, h(RefreshIcon, { size: 13 }), t("refresh")),
            h("button", { type: "button", className: "dshdb-btn small", onClick: openGlobalPanel }, t("openGlobal")),
            h("button", { type: "button", className: "dshdb-btn small primary", onClick: function () { setDialog({ mode: "new" }); } }, h(PlusIcon, { size: 13 }), t("newConnection"))
          )
        ),
        h("div", { className: "dshdb-cvpills" },
          selected.map(function (connection) {
            return h("button", {
              key: connection.id,
              type: "button",
              className: "dshdb-cvpill" + (connection.id === active.id ? " active" : ""),
              onClick: function () { setActiveId(connection.id); }
            },
              h("span", { className: "dshdb-dot" }),
              connection.name,
              connection.demo ? h("span", { className: "dshdb-badge demo" }, t("demo")) : null
            );
          }),
          h("span", { className: "dshdb-cvpillhint" }, t("askInChat"))
        ),
        h("div", { className: "dshdb-tabs", role: "tablist", "aria-label": t("tabsAria") },
          h("button", { type: "button", role: "tab", "aria-selected": tab === "data", className: "dshdb-tab" + (tab === "data" ? " active" : ""), onClick: function () { setTab("data"); } }, h(TableIcon, { size: 14 }), t("data")),
          h("button", { type: "button", role: "tab", "aria-selected": tab === "sql", className: "dshdb-tab" + (tab === "sql" ? " active" : ""), onClick: function () { setTab("sql"); } }, h(PlayIcon, { size: 13 }), t("sql")),
          h("button", { type: "button", role: "tab", "aria-selected": tab === "history", className: "dshdb-tab" + (tab === "history" ? " active" : ""), onClick: function () { setTab("history"); } }, h(HistoryIcon, { size: 14 }), t("history"))
        ),
        error ? h("div", { className: "dshdb-cvmessage" }, h("div", { className: "dshdb-error" }, error)) : null,
        h("div", { className: "dshdb-cvbody" }, tab === "data" ? dataPane : tab === "sql" ? sqlPane : historyPane),
        dialogNode
      );
    }

    /** Decorative database glyph for the sidebar row. */
    function DbStudioIcon(props) {
      return h(DatabaseIcon, { size: props.size || 18 });
    }

    /** Slash-command glyph (the trigger menu asks for a 14px icon). */
    function DbCommandIcon(props) {
      return h(DatabaseIcon, { size: props.size || 14 });
    }

    exports.name = "dsh-db-studio";
    exports.inject = ["slots", "layout", "locale", "commandUi"];
    exports.apply = function (ctx) {
      APP_CTX = ctx;
      installStyles(ctx);
      ctx.effect(function () {
        return ctx.locale.register(NS, { zh: zh, en: en });
      }, "dsh-db-studio: dictionaries");
      var t = ctx.locale.bind(NS);

      // `/db` in the composer: same row treatment as the built-in commands,
      // with a database glyph in front and no message submitted.
      var commandUi = ctx.get("commandUi");
      if (commandUi && typeof commandUi.register === "function") {
        ctx.effect(function () {
          return commandUi.register({
            name: "db",
            available: function () { return true; },
            label: function () { return t("commandLabel"); },
            description: function () { return t("commandDesc"); },
            icon: DbCommandIcon,
            ui: {
              kind: "action",
              run: function () { openGlobalPanel(); }
            }
          });
        }, "dsh-db-studio: /db command");
      }

      ctx.slots.inject("main", function () {
        return ctx.slots.register({
          name: "main",
          key: "dbstudio",
          locale: NS
        }, DbStudioPage);
      });
      ctx.slots.inject("sidebar.panellist", function () {
        return ctx.slots.register({
          name: "sidebar.panellist",
          id: "dbstudio",
          order: 20,
          locale: NS,
          label: function () { return t("title"); }
        }, DbStudioIcon);
      });

      // Conversation tab, right after Chat and before Trajectory (order 10).
      ctx.slots.inject("conversation.view", function () {
        return ctx.slots.register({
          name: "conversation.view",
          id: "dbstudio",
          order: 5,
          locale: NS,
          label: function () { return t("title"); }
        }, ConversationDbView);
      });

      // Composer control, beside the workspace/permission seats.
      ctx.slots.inject("conversation.input.left", function () {
        return ctx.slots.register({
          name: "conversation.input.left",
          id: "dbstudio",
          order: 20,
          locale: NS
        }, ConversationDbPicker);
      });

      // Connection status under the composer.
      ctx.slots.inject("conversation.composer.dock", function () {
        return ctx.slots.register({
          name: "conversation.composer.dock",
          id: "dbstudio",
          order: 20,
          locale: NS
        }, ConversationDbStatus);
      });
    };

    return module.exports;
  }
});
