const authService = require('../services/authService');

// 用户注册
async function register(req, res) {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '用户名和密码不能为空' });
  }

  try {
    await authService.register(username, password, role);
    res.json({ code: 200, message: '注册成功！' });
  } catch (err) {
    res.status(500).json({ message: '注册失败，用户名可能已存在', error: err.message });
  }
}

// 用户登录
async function login(req, res) {
  const { username, password } = req.body;

  try {
    const { token, user } = await authService.login(username, password);
    res.json({
      code: 200,
      message: '登录成功',
      token,
      user
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = { register, login };
