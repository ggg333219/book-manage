import type { ErrorRequestHandler } from 'express';

// 统一错误处理中间件（挂在所有路由之后）
// 约定：err.status 存在时返回对应状态码，否则返回 500
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  const status = (err as Error & { status?: number }).status || 500;
  res.status(status).json({
    message: (err as Error).message || '服务器内部错误'
  });
};
