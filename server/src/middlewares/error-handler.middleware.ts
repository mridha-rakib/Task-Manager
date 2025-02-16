import { z } from 'zod';
import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { HTTPSTATUS } from '@/config/http-config';
import { AppError } from '@/common/utils/AppError';
import {
  clearAuthenticationCookies,
  REFRESH_PATH,
} from '@/common/utils/cookie';
import { MongoError } from 'mongodb';

export const formatZodError = (res: Response, error: z.ZodError) => {
  console.log(error);
  const errors = error?.issues?.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: 'Validation failed',
    errors: errors,
  });
};

export const formatDuplicateKeyError = (res: Response, error: MongoError) => {
  // Extract the duplicate key field from the error message
  const keyMatch = error.message.match(/index: (\w+)_\d+/);
  const key = keyMatch ? keyMatch[1] : 'unknown';

  return res.status(HTTPSTATUS.CONFLICT).json({
    message: `Duplicate key error`,
    errors: [
      {
        field: key,
        message: `The value for '${key}' already exists and must be unique.`,
      },
    ],
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error occurred on PATH: ${req.path}`);
  console.error(error.message);

  if (req.path === REFRESH_PATH) {
    clearAuthenticationCookies(res);
  }

  if (error instanceof SyntaxError) {
    res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format, please check your request body',
    });
  }
  if (error instanceof z.ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  if (error instanceof MongoError && error.code === 11000) {
    return formatDuplicateKeyError(res, error);
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: error?.message || 'Unknown error occurred',
  });
};

export const notFountHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: 'URL Not Found',
    error: {
      code: 404,
      description: 'The requested URL does not exist on this server.',
    },
  });
};
