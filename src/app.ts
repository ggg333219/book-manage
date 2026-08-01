import express from 'express';
import cors from 'cors';
import authRoutes from './routers/auth';
import bookRoutes from './routers/books';
import borrowRoutes from './routers/borrow';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// 解析 JSON 请求体
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// 测试接口
app.get('/', (req, res) => {
  res.send('图书管理系统 API 运行中...');
});

// 统一错误处理（放在路由之后）
app.use(errorHandler);

// 启动服务器
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
});
