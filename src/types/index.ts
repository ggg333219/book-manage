// 数据库实体类型 —— 与 src/db/schema.ts 的表结构一一对应

/** 用户角色 */
export type Role = 'admin' | 'user';

/** 借阅状态三态枚举 */
export type BorrowStatus = 'borrowed' | 'returned' | 'overdue';

/** 用户表行 */
export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

/** 不含密码的用户信息（用于返回给前端 / 注入 req.user） */
export type SafeUser = Omit<User, 'password'>;

/** 图书表行 */
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  stock: number;
  created_at: string;
  updated_at: string;
}

/** 借阅记录表行 */
export interface BorrowRecord {
  id: number;
  user_id: number;
  book_id: number;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  status: BorrowStatus;
  created_at: string;
  updated_at: string;
}
