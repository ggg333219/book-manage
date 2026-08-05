import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { User } from './users/entities/user.entities';
import { Book } from './books/entities/book.entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const userRepository = dataSource.getRepository(User);
  const bookRepository = dataSource.getRepository(Book);

  const admin = await userRepository.findOne({ where: { username: 'admin' } });
  if (!admin) {
    await userRepository.save(
      userRepository.create({ username: 'admin', password: 'admin123', role: 'admin' }),
    );
  }

  const demoBook = await bookRepository.findOne({ where: { isbn: '9787111212834' } });
  if (!demoBook) {
    await bookRepository.save(
      bookRepository.create({
        title: 'JavaScript高级程序设计',
        author: 'Nicholas C. Zakas',
        isbn: '9787111212834',
        stock: 10,
      }),
    );
  }

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port).catch(async (error: any) => {
    if (error?.code === 'EADDRINUSE') {
      console.warn(`Port ${port} is busy, trying ${port + 1}`);
      await app.listen(port + 1);
      return;
    }
    throw error;
  });
}
bootstrap();
