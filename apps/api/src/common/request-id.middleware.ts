import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const header = req.header('x-request-id');
    req.requestId = header ?? randomUUID();
    res.setHeader('x-request-id', req.requestId);
    next();
  }
}
