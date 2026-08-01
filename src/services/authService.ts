import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import jwtConfig from '../config/jwt';
import type { Role, SafeUser, User } from '../types';

export interface LoginResult {
  token: string;
  user: SafeUser;
}

function toSafeUser(user: User): SafeUser {
  const { password: _password, ...safe } = user;
  return safe;
}

// 用户注册（用户名唯一，重复时抛出 UNIQUE 约束错误）
export async function register(username: string, password: string, role?: Role): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(
    username,
    hashedPassword,
    role || 'user'
  );
}

// 用户登录：校验凭据并签发 JWT
export async function login(username: string, password: string): Promise<LoginResult> {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;

  if (!user) {
    const err = new Error('用户不存在');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('密码错误');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    jwtConfig.JWT_SECRET,
    { expiresIn: jwtConfig.JWT_EXPIRES_IN }
  );

  return { token, user: toSafeUser(user) };
}
