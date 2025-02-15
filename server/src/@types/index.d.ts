import type { IUserDocument } from '@/modules/user/user.interface';
import { Request } from 'express';

declare global {
  namespace Express {
    interface User extends IUserDocument {}
    interface Request {
      sessionId?: string;
    }
  }
}
