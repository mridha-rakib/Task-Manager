import { asyncHandler } from '@/middlewares/asyncHandler';
import type { UserRepository } from './user.repository';
import { HTTPSTATUS } from '@/config/http-config';

export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}
