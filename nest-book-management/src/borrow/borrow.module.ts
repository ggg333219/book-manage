import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from './entities/borrow-record.entity';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { Book } from '../books/entities/book.entities';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book])],
  controllers: [BorrowController],
  providers: [BorrowService],
  exports: [BorrowService],
})
export class BorrowModule {}
