import type { AuthUser } from './request';

// 扩展 Express.Request，让 req.user 有类型（verifyToken 中间件注入）
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
