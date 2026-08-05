import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { BorrowRecord } from '../../borrow/entities/borrow-record.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 'user' })
  role!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // 建立一对多关联：一个用户可以有条借阅记录
  @OneToMany(() => BorrowRecord, (record) => record.user)
  borrows!: BorrowRecord[];
}