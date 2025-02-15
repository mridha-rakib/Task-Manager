import { asyncHandler } from '@/middlewares/asyncHandler';
import type { AuthRepository } from './auth.repository';
import { zParse } from '@/common/utils/validators.util';
import {
  createUserSchema,
  emailSchema,
  verificationEmailSchema,
} from '../user/user.schema';
import { HTTPSTATUS } from '@/config/http-config';
import { loginAuthSchema, resetPasswordSchema } from './auth.schema';
import {
  clearAuthenticationCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthenticationCookies,
} from '@/common/utils/cookie';
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

    const { accessToken, newRefreshToken } =
      await this.authRepository.refreshToken(refreshToken);

    if (newRefreshToken) {
      res.cookie(
        'refreshToken',
        newRefreshToken,
        getRefreshTokenCookieOptions()
      );
    }

    return res
      .status(HTTPSTATUS.OK)
      .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
      .json({
        message: 'Refresh access token successfully',
      });
  });

  public verifyEmail = asyncHandler(async (req, res): Promise<any> => {
    const { code: verificationCOde } = await zParse(
      verificationEmailSchema,
      req,
      res
    );

    const { user } = await this.authRepository.verifyEmail(verificationCOde);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Email verified successfully',
    });
  });

  public forgotPassword = asyncHandler(async (req, res) => {
    const { body: data } = await zParse(emailSchema, req, res);
    const { email } = data;
    await this.authRepository.forgotPassword(email);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Password reset email sent',
    });
  });

  public resetPassword = asyncHandler(async (req, res): Promise<any> => {
    const data = await zParse(resetPasswordSchema, req, res);

    await this.authRepository.resetPassword(data);

    return clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
      message: 'Reset Password successfully',
    });
  });

  public logout = asyncHandler(async (req, res) => {});
}
