import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const role = req.headers['x-user-role'];

    if (role !== 'admin') {
      throw new ForbiddenException('只有管理员可以操作');
    }

    return true;
  }
}
