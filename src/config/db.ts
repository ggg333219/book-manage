import Database from 'better-sqlite3';
import path from 'path';
import { SCHEMA_SQL } from '../db/schema';

// 指向项目根目录的 books.db 文件
const dbPath = path.join(__dirname, '..', '..', 'books.db');
const db = new Database(dbPath);

// 幂等建表：全新库启动即自动建表，旧表结构不兼容时需手动重建
db.exec(SCHEMA_SQL);

// better-sqlite3 开启外键约束（PRAGMA 已在 schema 中声明，此处兜底确保每个连接生效）
db.pragma('foreign_keys = ON');

console.log('SQLite 数据库连接成功');

export default db;
