import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entities';
import { Book } from './books/entities/book.entities';
import { BorrowRecord } from './borrow/entities/borrow-record.entity';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'books.db',
      entities: [User, Book, BorrowRecord],
      synchronize: true,
      logging: true,
    }),
    BooksModule,
    BorrowModule,
    AuthModule,
  ],
})
export class AppModule {}