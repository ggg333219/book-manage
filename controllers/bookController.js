const bookService = require('../services/bookService');

// 获取所有图书列表
function listBooks(req, res) {
  const books = bookService.listBooks();
  res.json({ code: 200, data: books });
}

// 新增图书
function addBook(req, res) {
  const { title, author, isbn, stock } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: '书名和作者为必填项' });
  }

  try {
    const bookId = bookService.addBook({ title, author, isbn, stock });
    res.json({ code: 200, message: '图书添加成功', bookId });
  } catch (err) {
    res.status(500).json({ message: '添加失败', error: err.message });
  }
}

// 删除图书
function deleteBook(req, res) {
  const { id } = req.params;
  const deleted = bookService.deleteBook(id);

  if (deleted) {
    res.json({ code: 200, message: '删除成功' });
  } else {
    res.status(404).json({ message: '未找到该图书' });
  }
}

module.exports = { listBooks, addBook, deleteBook };
