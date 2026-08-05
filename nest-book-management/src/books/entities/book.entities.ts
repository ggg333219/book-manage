import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BookStatus } from '../../common/enum';
import { BorrowRecord } from '../../borrow/entities/borrow-record.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column({ length: 50 })
  author!: string;

  @Column({ unique: true, length: 30 })
  isbn!: string;

  @Column({ type: 'integer', default: 0 })
  stock!: number;

  @Column({ type: 'integer', default: BookStatus.ON_SHELF })
  status!: BookStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => BorrowRecord, (record) => record.book)
  borrows!: BorrowRecord[];
}