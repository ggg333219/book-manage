import db from '../config/db';
import type { Book } from '../types';

export interface AddBookInput {
  title: string;
  author: string;
  isbn?: string;
  stock?: number;
}

// 获取所有图书列表
export function listBooks(): Book[] {
  return db.prepare('SELECT * FROM books').all() as Book[];
}

// 新增图书，返回新记录 id
export function addBook({ title, author, isbn, stock }: AddBookInput): number {
  const result = db
    .prepare('INSERT INTO books (title, author, isbn, stock) VALUES (?, ?, ?, ?)')
    .run(title, author, isbn, stock ?? 1);
  return Number(result.lastInsertRowid);
}

// 删除图书，返回是否删除成功
export function deleteBook(id: number): boolean {
  const result = db.prepare('DELETE FROM books WHERE id = ?').run(id);
  return result.changes > 0;
}
