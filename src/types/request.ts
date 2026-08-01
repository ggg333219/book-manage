import type { Role } from './index';

// 各接口请求体契约 —— controller 用 RequestHandler<{}, {}, XxxBody> 绑定

/** POST /api/auth/register */
export interface RegisterBody {
  username: string;
  password: string;
  role?: Role;
}

/** POST /api/auth/login */
export interface LoginBody {
  username: string;
  password: string;
}

/** POST /api/books */
export interface AddBookBody {
  title: string;
  author: string;
  isbn?: string;
  stock?: number;
}

/** POST /api/borrow/out */
export interface BorrowBody {
  user_id: number;
  book_id: number;
}

/** POST /api/borrow/return */
export interface ReturnBody {
  record_id: number;
  book_id: number;
}

/** verifyToken 中间件写入 req.user 的载荷 */
export interface AuthUser {
  id: number;
  username: string;
  role: Role;
}
