const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

// 办理借书
router.post('/out', borrowController.borrowBook);

// 办理还书
router.post('/return', borrowController.returnBook);

module.exports = router;
