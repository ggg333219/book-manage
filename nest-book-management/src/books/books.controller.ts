import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { AdminGuard } from '../common/guards/admin.guard';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { BookCreatePipe } from '../common/pipes/book-create.pipe';

@Controller('books')
@UseInterceptors(ResponseInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(BookCreatePipe)
  async create(@Body() body: { title: string; author: string; isbn?: string; stock?: number }) {
    const book = await this.booksService.createBook(body);
    return { message: '图书添加成功', data: book };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string) {
    await this.booksService.deleteBook(Number(id));
    return { message: '删除成功' };
  }
}
