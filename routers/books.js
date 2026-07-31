const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// 1. 获取所有图书列表
router.get('/', bookController.listBooks);

// 2. 新增图书
router.post('/', bookController.addBook);

// 3. 删除图书
router.delete('/:id', bookController.deleteBook);

module.exports = router;
