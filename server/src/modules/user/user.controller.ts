import { asyncHandler } from '@/middlewares/asyncHandler';
import type { UserRepository } from './user.repository';
import { HTTPSTATUS } from '@/config/http-config';
import { NotFoundException } from '@/common/utils/catch-errors';
import SessionModel from '@/database/models/session.model';

export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  public findUser = asyncHandler(async (req, res): Promise<any> => {
    const sessionId = req.sessionId;
    if (!sessionId) {
      throw new NotFoundException('Session is invalid.');
    }

    res.send('user');
  });
}
