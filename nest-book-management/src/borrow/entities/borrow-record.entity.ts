import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entities';
import { Book } from '../../books/entities/book.entities';
import { BorrowStatus } from '../../common/enum';

@Entity('borrow_records')
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'book_id' })
  bookId!: number;

  @CreateDateColumn({ name: 'borrow_date' })
  borrowDate!: Date;

  // 补齐业务字段：应还时间
  @Column({ name: 'due_date', type: 'datetime' })
  dueDate!: Date;

  @Column({ name: 'return_date', type: 'datetime', nullable: true })
  returnDate!: Date | null;

  @Column({ type: 'integer', default: BorrowStatus.BORROWED })
  status!: BorrowStatus;

  // 多对一外键关联
  @ManyToOne(() => User, (user) => user.borrows, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Book, (book) => book.borrows, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book!: Book;
}