import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string, role = 'user') {
    const exists = await this.userRepository.findOne({ where: { username } });
    if (exists) {
      throw new BadRequestException('用户名已存在');
    }

    const user = this.userRepository.create({ username, password, role });
    await this.userRepository.save(user);
    return { code: 200, message: '注册成功' };
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    return {
      code: 200,
      message: '登录成功',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
