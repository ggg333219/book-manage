import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Book } from '../books/entities/book.entities';
import { BorrowRecord } from './entities/borrow-record.entity';
import { BorrowStatus } from '../common/enum';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly dataSource: DataSource,
  ) {}

  async borrowBook(userId: number, bookId: number, borrowDays = 14) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const book = await queryRunner.manager.findOne(Book, { where: { id: bookId } });
      if (!book || book.stock <= 0) {
        throw new BadRequestException('图书库存不足或不存在');
      }

      book.stock -= 1;
      await queryRunner.manager.save(book);

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + borrowDays);

      const record = queryRunner.manager.create(BorrowRecord, {
        userId,
        bookId,
        dueDate,
        status: BorrowStatus.BORROWED,
      });

      const saved = await queryRunner.manager.save(record);
      await queryRunner.commitTransaction();

      return { code: 200, message: '借书成功', data: saved };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async returnBook(recordId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const record = await queryRunner.manager.findOne(BorrowRecord, { where: { id: recordId } });
      if (!record) {
        throw new BadRequestException('借阅记录不存在');
      }

      record.returnDate = new Date();
      record.status = BorrowStatus.RETURNED;
      await queryRunner.manager.save(record);

      const book = await queryRunner.manager.findOne(Book, { where: { id: record.bookId } });
      if (book) {
        book.stock += 1;
        await queryRunner.manager.save(book);
      }

      await queryRunner.commitTransaction();
      return { code: 200, message: '还书成功' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}