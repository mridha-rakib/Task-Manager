import { HTTPSTATUS, type HttpStatusCode } from '@/config/http-config';

export class AppError extends Error {
  public statusCode: HttpStatusCode;

  constructor(message: string, statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
