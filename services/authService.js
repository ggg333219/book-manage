const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');

// 用户注册
async function register(username, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  stmt.run(username, hashedPassword, role || 'user');
}

// 用户登录，返回 token 和用户信息
async function login(username, password) {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  if (!user) {
    const err = new Error('用户不存在');
    err.status = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('密码错误');
    err.status = 400;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: { id: user.id, username: user.username, role: user.role }
  };
}

module.exports = { register, login };
