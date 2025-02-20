import { UnauthorizedException } from '@/common/utils/catch-errors';
import type { Request, Response, NextFunction } from 'express';
import { logger } from './pino-logger';

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  console.error('Hello: ', req.isAuthenticated.name);

  if (req.isAuthenticated()) {
    return next(
      new UnauthorizedException(
        'You are already logged in. Please logout first.'
      )
    );
  }
  next();
};
