// 种子数据脚本：npm run db:seed
// 仅当 users 表为空时插入，可重复执行不会重复播种
import bcrypt from 'bcryptjs';
import db from '../config/db';

const seed = db.transaction(() => {
  const userCount = (db.prepare('SELECT COUNT(*) AS c FROM users').get() as { c: number }).c;
  if (userCount > 0) {
    console.log('users 表已有数据，跳过播种');
    return;
  }

  // 管理员 + 普通用户
  const insertUser = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  insertUser.run('admin', bcrypt.hashSync('admin123', 10), 'admin');
  insertUser.run('zhangsan', bcrypt.hashSync('123456', 10), 'user');

  // 两本示例图书
  const insertBook = db.prepare('INSERT INTO books (title, author, isbn, stock) VALUES (?, ?, ?, ?)');
  insertBook.run('JavaScript 高级程序设计', 'Nicholas C. Zakas', '9787111212834', 10);
  insertBook.run('你当像鸟飞往你的山', 'Tara Westover', '9787544270878', 3);

  console.log('种子数据已写入：admin/admin123、zhangsan/123456，2 本图书');
});

seed();
