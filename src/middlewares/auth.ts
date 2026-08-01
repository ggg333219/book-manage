import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';
import type { AuthUser } from '../types/request';

// JWT 鉴权中间件：校验请求头 Authorization: Bearer <token>，通过后注入 req.user
export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: '未登录或 token 缺失' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET) as AuthUser;
    req.user = decoded; // 后续可获取 req.user.id / req.user.role
    next();
  } catch {
    res.status(401).json({ message: 'token 无效或已过期' });
  }
};
