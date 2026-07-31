const borrowService = require('../services/borrowService');

// 办理借书
function borrowBook(req, res) {
  const { user_id, book_id } = req.body;

  try {
    borrowService.borrowBook(user_id, book_id);
    res.json({ code: 200, message: '借书成功！' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// 办理还书
function returnBook(req, res) {
  const { record_id, book_id } = req.body;

  try {
    borrowService.returnBook(record_id, book_id);
    res.json({ code: 200, message: '还书成功！' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { borrowBook, returnBook };
