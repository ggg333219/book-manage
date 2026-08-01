import type { RequestHandler } from 'express';
import { borrowBook as borrowBookService, returnBook as returnBookService } from '../services/borrowService';
import type { BorrowBody, ReturnBody } from '../types/request';

// POST /api/borrow/out
export const borrowBook: RequestHandler<{}, {}, BorrowBody> = (req, res) => {
  const { user_id, book_id } = req.body;

  try {
    borrowBookService(user_id, book_id);
    res.json({ code: 200, message: '借书成功！' });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// POST /api/borrow/return
export const returnBook: RequestHandler<{}, {}, ReturnBody> = (req, res) => {
  const { record_id, book_id } = req.body;

  try {
    returnBookService(record_id, book_id);
    res.json({ code: 200, message: '还书成功！' });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
