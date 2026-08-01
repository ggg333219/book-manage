import { Router } from 'express';
import { listBooks, addBook, deleteBook } from '../controllers/bookController';

const router = Router();

// 1. 获取所有图书列表
router.get('/', listBooks);

// 2. 新增图书
router.post('/', addBook);

// 3. 删除图书
router.delete('/:id', deleteBook);

export default router;
