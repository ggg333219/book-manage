import { Body, Controller, Post } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('out')
  async borrowBook(@Body() body: { userId: number; bookId: number }) {
    return this.borrowService.borrowBook(body.userId, body.bookId);
  }

  @Post('return')
  async returnBook(@Body() body: { recordId: number }) {
    return this.borrowService.returnBook(body.recordId);
  }
}