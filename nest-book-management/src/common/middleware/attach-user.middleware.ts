import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AttachUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const roleHeader = req.headers['x-user-role'];
    const role = typeof roleHeader === 'string' ? roleHeader : 'user';

    (req as any).user = { role };
    next();
  }
}
