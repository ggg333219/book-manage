// 数据库表结构 DDL
// 设计要点：
//   业务完整性：borrow_records.due_date 应还时间必填；status 三态枚举
//   约束与性能：CHECK(stock>=0 / role / status)、books(title)、borrow_records 三索引
//   追溯性：三表统一 created_at + updated_at；外键 ON DELETE 防孤儿数据
// 全部 IF NOT EXISTS，启动时幂等执行

export const SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL,
    role       TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS books (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    author     TEXT NOT NULL,
    isbn       TEXT UNIQUE,
    stock      INTEGER NOT NULL DEFAULT 1 CHECK (stock >= 0),
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);

CREATE TABLE IF NOT EXISTS borrow_records (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id     INTEGER NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
    borrow_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    due_date    TEXT NOT NULL,
    return_date TEXT,
    status      TEXT NOT NULL DEFAULT 'borrowed'
                CHECK (status IN ('borrowed', 'returned', 'overdue')),
    created_at  TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);
CREATE INDEX IF NOT EXISTS idx_borrow_user   ON borrow_records(user_id);
CREATE INDEX IF NOT EXISTS idx_borrow_book   ON borrow_records(book_id);
CREATE INDEX IF NOT EXISTS idx_borrow_status ON borrow_records(status);
`;
