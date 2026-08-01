import { Router } from 'express';
import { borrowBook, returnBook } from '../controllers/borrowController';

const router = Router();

// 办理借书
router.post('/out', borrowBook);

// 办理还书
router.post('/return', returnBook);

export default router;
