const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

// JWT 鉴权中间件：校验请求头 Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未登录或 token 缺失' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // 后续可获取 req.user.id / req.user.role
    next();
  } catch (err) {
    return res.status(401).json({ message: 'token 无效或已过期' });
  }
}

module.exports = { verifyToken };
