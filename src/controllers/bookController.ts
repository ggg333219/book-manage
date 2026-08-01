import type { RequestHandler } from 'express';
import { listBooks as listBooksService, addBook as addBookService, deleteBook as deleteBookService } from '../services/bookService';
import type { AddBookBody } from '../types/request';

// GET /api/books
export const listBooks: RequestHandler = (req, res) => {
  const books = listBooksService();
  res.json({ code: 200, data: books });
};

// POST /api/books
export const addBook: RequestHandler<{}, {}, AddBookBody> = (req, res) => {
  const { title, author, isbn, stock } = req.body;
  if (!title || !author) {
    res.status(400).json({ message: '书名和作者为必填项' });
    return;
  }

  try {
    const bookId = addBookService({ title, author, isbn, stock });
    res.json({ code: 200, message: '图书添加成功', bookId });
  } catch (err) {
    res.status(500).json({ message: '添加失败', error: (err as Error).message });
  }
};

// DELETE /api/books/:id
export const deleteBook: RequestHandler<{ id: string }> = (req, res) => {
  const { id } = req.params;
  const deleted = deleteBookService(Number(id));

  if (deleted) {
    res.json({ code: 200, message: '删除成功' });
  } else {
    res.status(404).json({ message: '未找到该图书' });
  }
};
