const express = require("express");
const cors = require("cors");
const app = express();

// 解析 JSON 请求体
app.use(express.json());
app.use(cors());

const authRoutes = require('./routers/auth');
const bookRoutes = require('./routers/books');
const borrowRoutes = require('./routers/borrow');
const { errorHandler } = require('./middlewares/errorHandler');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// 测试接口
app.get("/", (req, res) => {
    res.send("图书管理系统 API 运行中...");
});

// 统一错误处理（放在路由之后）
app.use(errorHandler);

// 启动服务器
app.listen(8001, () => {
    console.log("服务已启动: http://localhost:8001");
});
