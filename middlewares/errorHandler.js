// 统一错误处理中间件
// 用法：err.status 存在时返回对应状态码，否则返回 500
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || '服务器内部错误'
  });
}

module.exports = { errorHandler };
