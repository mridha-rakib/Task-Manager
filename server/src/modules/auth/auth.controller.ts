import { asyncHandler } from '@/middlewares/asyncHandler';
import type { AuthRepository } from './auth.repository';
import { zParse } from '@/common/utils/validators.util';
import { createUserSchema } from '../user/user.schema';
import { HTTPSTATUS } from '@/config/http-config';
import { loginAuthSchema } from './auth.schema';
import { setAuthenticationCookies } from '@/common/utils/cookie';
import { UnauthorizedException } from '@/common/utils/catch-errors';

export class AuthController {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public register = asyncHandler(async (req, res): Promise<any> => {
    const { body: data } = await zParse(createUserSchema, req, res);

    const { user } = await this.authRepository.register(data);
    return res.status(HTTPSTATUS.CREATED).json({
      message: 'User registered successfully',
      data: user,
    });
  });

  public login = asyncHandler(async (req, res): Promise<any> => {
    const userAgent = req.headers['user-agent'];
    req.body.userAgent = userAgent;
    const { body: data } = await zParse(loginAuthSchema, req, res);

    const { user, accessToken, refreshToken } =
      await this.authRepository.login(data);

    return setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(HTTPSTATUS.OK)
      .json({
        message: 'User login successfully',
        user,
      });
  });

  public refreshToken = asyncHandler(async (req, res): Promise<any> => {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    // const {} = await this.authRepository.refreshToken
  });
}
