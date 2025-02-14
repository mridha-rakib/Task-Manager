import { HTTPSTATUS, type HttpStatusCode } from '@/config/http-config';
import { AppError } from './AppError';

export class NotFoundException extends AppError {
  constructor(message = 'Resource not found') {
    super(message, HTTPSTATUS.NOT_FOUND);
  }
}

export class BadRequestException extends AppError {
  constructor(message = 'Bad Request') {
    super(message, HTTPSTATUS.BAD_REQUEST);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = 'Unauthorized Access') {
    super(message, HTTPSTATUS.UNAUTHORIZED);
  }
}

export class InternalServerException extends AppError {
  constructor(message = 'Internal Server Error') {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR);
  }
}

export class HttpException extends AppError {
  constructor(message = 'Http Exception Error', statusCode: HttpStatusCode) {
    super(message, statusCode);
  }
}
