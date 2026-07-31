const db = require('../config/db');

// 获取所有图书列表
function listBooks() {
  return db.prepare('SELECT * FROM books').all();
}

// 新增图书，返回新记录的 id
function addBook({ title, author, isbn, stock }) {
  const stmt = db.prepare('INSERT INTO books (title, author, isbn, stock) VALUES (?, ?, ?, ?)');
  const result = stmt.run(title, author, isbn, stock || 1);
  return result.lastInsertRowid;
}

// 删除图书，返回是否删除成功
function deleteBook(id) {
  const stmt = db.prepare('DELETE FROM books WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

module.exports = { listBooks, addBook, deleteBook };
