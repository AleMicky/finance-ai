import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

type ErrorBody = {
  statusCode: number;
  path: string;
  message: string | string[];
  timestamp: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = (() => {
      if (!isHttp) return 'Internal server error';

      const r = exception.getResponse();
      // Nest puede devolver string u objeto { message: string | string[] }
      if (typeof r === 'string') return r;

      if (r && typeof r === 'object') {
        const ro = r as Record<string, unknown>;
        const m = ro['message'];
        if (typeof m === 'string') return m;
        if (Array.isArray(m) && m.every((x) => typeof x === 'string')) return m;
      }
      return exception.message;
    })();

    const body: ErrorBody = {
      statusCode: status,
      path: req.url,
      message,
      timestamp: new Date().toISOString(),
    };

    res.status(status).json(body);
  }
}
