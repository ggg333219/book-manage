const db = require('../config/db');

// 办理借书（事务：检查库存 -> 扣减库存 -> 生成借阅记录）
function borrowBook(user_id, book_id) {
  const borrowTransaction = db.transaction(() => {
    // 1. 检查图书库存
    const book = db.prepare('SELECT stock FROM books WHERE id = ?').get(book_id);
    if (!book || book.stock <= 0) {
      throw new Error('图书库存不足或不存在');
    }

    // 2. 扣减库存
    db.prepare('UPDATE books SET stock = stock - 1 WHERE id = ?').run(book_id);

    // 3. 插入借阅记录
    db.prepare("INSERT INTO borrow_records (user_id, book_id, status) VALUES (?, ?, 'borrowed')").run(user_id, book_id);
  });

  borrowTransaction();
}

// 办理还书（事务：更新借阅状态 -> 恢复库存）
function returnBook(record_id, book_id) {
  const returnTransaction = db.transaction(() => {
    // 1. 更新借阅状态
    const result = db.prepare(
      "UPDATE borrow_records SET status = 'returned', return_date = CURRENT_TIMESTAMP WHERE id = ? AND status = 'borrowed'"
    ).run(record_id);

    if (result.changes === 0) {
      throw new Error('无效的借阅记录或图书已归还');
    }

    // 2. 恢复库存
    db.prepare('UPDATE books SET stock = stock + 1 WHERE id = ?').run(book_id);
  });

  returnTransaction();
}

module.exports = { borrowBook, returnBook };
