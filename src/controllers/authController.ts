import type { RequestHandler } from 'express';
import { register as registerService, login as loginService } from '../services/authService';
import type { LoginBody, RegisterBody } from '../types/request';

// POST /api/auth/register
export const register: RequestHandler<{}, {}, RegisterBody> = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: '用户名和密码不能为空' });
    return;
  }

  try {
    await registerService(username, password, role);
    res.json({ code: 200, message: '注册成功！' });
  } catch (err) {
    res.status(500).json({ message: '注册失败，用户名可能已存在', error: (err as Error).message });
  }
};

// POST /api/auth/login
export const login: RequestHandler<{}, {}, LoginBody> = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await loginService(username, password);
    res.json({
      code: 200,
      message: '登录成功',
      token,
      user
    });
  } catch (err) {
    const status = (err as Error & { status?: number }).status || 500;
    res.status(status).json({ message: (err as Error).message });
  }
};
