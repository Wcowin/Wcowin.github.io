// search-worker.js

// 导入 sql.js 库
self.importScripts('/search/sql-wasm.js'); // 假设 sql-wasm.js 在 /search/ 目录下

let db = null;

async function initializeDatabase() {
    try {
        const SQL = await initSqlJs({
            locateFile: file => `/search/${file}` // 假设 sql-wasm.wasm 在 /search/ 目录下
        });
        const response = await fetch('/search/search_index.db'); // 假设数据库文件在 /search/ 目录下
        const buffer = await response.arrayBuffer();
        db = new SQL.Database(new Uint8Array(buffer));
        self.postMessage({ type: 'db_loaded' });
    } catch (err) {
        console.error("Worker: Failed to load database:", err);
        self.postMessage({ type: 'db_error', error: err.message });
    }
}

function performSearch(search_query) {
    if (!db) {
        self.postMessage({ type: 'search_error', error: 'Database not loaded yet.' });
        return;
    }
    try {
        const stmt = db.prepare("SELECT id, url, name, title, link, body FROM mkdocs WHERE title LIKE ? OR body LIKE ?");
        const searchQueryWithWildcards = `%${search_query}%`;
        stmt.bind([searchQueryWithWildcards, searchQueryWithWildcards]);

        let collectedValues = [];
        while (stmt.step()) {
            collectedValues.push(stmt.get());
        }
        stmt.free();

        self.postMessage({ type: 'search_results', results: collectedValues });
    } catch (error) {
        console.error('Worker: Search error: ' + error.message);
        self.postMessage({ type: 'search_error', error: error.message });
    }
}

self.onmessage = function (e) {
    const { type, query } = e.data;
    if (type === 'load_db') {
        initializeDatabase();
    } else if (type === 'search') {
        performSearch(query);
    }
};