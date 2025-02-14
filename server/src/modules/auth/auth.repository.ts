import { VerificationEnum } from '@/common/enums/verification-code.enum';
import {
  BadRequestException,
  UnauthorizedException,
} from '@/common/utils/catch-errors';
import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
} from '@/common/utils/date-time';
import {
  refreshTokenSignOptions,
  type RefreshTPayload,
  signJwtToken,
  verifyJwtToken,
} from '@/common/utils/jwt';
import SessionModel from '@/database/models/session.model';
import UserModel from '@/database/models/user.model';
import VerificationCodeModel from '@/database/models/Verification.model';
import env from '@/env';
import { sendEmail } from '@/mailers/mailer';
import { verifyEmailTemplate } from '@/mailers/template/email.template';
import { logger } from '@/middlewares/pino-logger';

export class AuthRepository {
  public async register(registerData: any) {
    const { name, email, password } = registerData;

    const existingUser = await UserModel.exists({
      email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const userId = newUser._id;

    const verification = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFiveMinutesFromNow(),
    });

    const verificationUrl = `${env.APP_ORIGIN}/confirm-account?code=${verification.code}`;

    await sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verificationUrl),
    });

    return {
      user: newUser,
    };
  }

  public async login(loginData: any) {
    const { email, password, userAgent } = loginData;
    logger.info(`Login attempt for email: ${email}`);

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      logger.warn(`Login failed: User with email ${email} not found`);
      throw new BadRequestException('Invalid email or password provided');
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      logger.warn(`Login failed: Invalid password for email: ${email}`);
      throw new BadRequestException('Invalid email or password provided');
    }

    const session = await SessionModel.create({
      userId: user._id,
      userAgent,
    });

    const accessToken = signJwtToken({
      userId: user._id,
      sessionId: session._id,
    });

    const refreshToken = signJwtToken(
      {
        sessionId: session._id,
      },
      refreshTokenSignOptions
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(refreshToken: string) {
    const { payload } = verifyJwtToken<RefreshTPayload>(refreshToken, {
      secret: refreshTokenSignOptions.secret,
    });

    if (!payload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const session = await SessionModel.findById(payload.sessionId);
    const now = Date.now();

    if (!session) {
      throw new UnauthorizedException('Session does not exist');
    }

    if (session.expiredAt.getTime() <= now) {
      throw new UnauthorizedException('Session expired');
    }

    const sessionRequireRefresh =
      session.expiredAt.getTime() - now <= ONE_DAY_IN_MS;

    if (sessionRequireRefresh) {
      session.expiredAt = calculateExpirationDate(env.JWT_REFRESH_EXPIRES_IN);
      await session.save();
    }

    const newRefreshToken = sessionRequireRefresh
      ? signJwtToken({ sessionId: session._id }, refreshTokenSignOptions)
      : undefined;

    const accessToken = signJwtToken({
      userId: String(session.userId),
      sessionId: session._id,
    });

    return {
      accessToken,
      newRefreshToken,
    };
  }

  public async verifyEmail(code: string) {
    const validCode = await VerificationCodeModel.findOne({
      code: code,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: { $gt: new Date() },
    });

    if (!validCode) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      validCode.userId,
      {
        isEmailVerified: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new BadRequestException('Unable to verify email address');
    }

    await validCode.deleteOne();
    return {
      user: updatedUser,
    };
  }
}
