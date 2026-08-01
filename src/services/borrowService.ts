import db from '../config/db';

/**
 * 把超期的 borrowed 记录标为 overdue（应还时间已过仍未还）
 * 在借书/还书前调用，保证状态实时准确
 */
export function syncOverdue(): void {
  db.prepare(
    `UPDATE borrow_records
     SET status = 'overdue', updated_at = datetime('now', 'localtime')
     WHERE status = 'borrowed' AND due_date < datetime('now', 'localtime')`
  ).run();
}

// 办理借书：借期固定 30 天，due_date 由 SQL 计算
export function borrowBook(user_id: number, book_id: number): void {
  syncOverdue();

  const tx = db.transaction(() => {
    // 1. 检查图书库存
    const book = db.prepare('SELECT stock FROM books WHERE id = ?').get(book_id) as { stock: number } | undefined;
    if (!book || book.stock <= 0) {
      throw new Error('图书库存不足或不存在');
    }

    // 2. 扣减库存
    db.prepare(`UPDATE books SET stock = stock - 1, updated_at = datetime('now', 'localtime') WHERE id = ?`).run(book_id);

    // 3. 插入借阅记录（due_date = 借书日 + 30 天）
    db.prepare(
      `INSERT INTO borrow_records (user_id, book_id, due_date)
       VALUES (?, ?, datetime('now', 'localtime', '+30 days'))`
    ).run(user_id, book_id);
  });

  tx();
}

// 办理还书：borrowed / overdue 状态都可归还
export function returnBook(record_id: number, book_id: number): void {
  syncOverdue();

  const tx = db.transaction(() => {
    // 1. 更新借阅状态
    const result = db.prepare(
      `UPDATE borrow_records
       SET status = 'returned', return_date = datetime('now', 'localtime'), updated_at = datetime('now', 'localtime')
       WHERE id = ? AND status IN ('borrowed', 'overdue')`
    ).run(record_id);

    if (result.changes === 0) {
      throw new Error('无效的借阅记录或图书已归还');
    }

    // 2. 恢复库存
    db.prepare(`UPDATE books SET stock = stock + 1, updated_at = datetime('now', 'localtime') WHERE id = ?`).run(book_id);
  });

  tx();
}
