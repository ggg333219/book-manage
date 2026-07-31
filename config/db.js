const Database = require('better-sqlite3');
const path = require('path');

// 指向刚刚生成的 books.db 文件
const dbPath = path.join(__dirname, '../books.db');
const db = new Database(dbPath, { verbose: console.log });

console.log('SQLite 数据库连接成功');

module.exports = db;