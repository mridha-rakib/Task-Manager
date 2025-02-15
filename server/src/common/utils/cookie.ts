import env from '@/env';
import type { CookieOptions, Response } from 'express';
import { calculateExpirationDate } from './date-time';

type CookiePayloadType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const REFRESH_PATH = `${env.BASE_PATH}/auth/refresh`;

const defaults: CookieOptions = {
  httpOnly: true,
};

export const clearAuthenticationCookies = (res: Response): Response => {
  console.log('Clearing accessToken and refreshToken cookies');
  return res.clearCookie('accessToken').clearCookie('refreshToken', {
    path: REFRESH_PATH,
  });
};

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiresIn = String(env.JWT_EXPIRES_IN);
  const expires = calculateExpirationDate(expiresIn);

  return {
    ...defaults,
    expires,
    path: '/',
  };
};

export const getAccessTokenCookieOptions = (): CookieOptions => {
  const expiresIn = String(env.JWT_EXPIRES_IN);

  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults,
    expires,
    path: '/',
  };
};

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: CookiePayloadType): Response =>
  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());
