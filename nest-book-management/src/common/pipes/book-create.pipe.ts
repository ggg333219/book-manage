import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class BookCreatePipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('请求体必须是对象');
    }

    const { title, author, stock } = value;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new BadRequestException('标题不能为空');
    }

    if (!author || typeof author !== 'string' || author.trim().length === 0) {
      throw new BadRequestException('作者不能为空');
    }

    if (stock !== undefined && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
      throw new BadRequestException('库存必须是非负整数');
    }

    return {
      ...value,
      title: title.trim(),
      author: author.trim(),
      stock: stock === undefined ? 1 : Number(stock),
    };
  }
}
