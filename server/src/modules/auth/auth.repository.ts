import { VerificationEnum } from '@/common/enums/verification-code.enum';
import { BadRequestException } from '@/common/utils/catch-errors';
import { fortyFiveMinutesFromNow } from '@/common/utils/date-time';
import { refreshTokenSignOptions, signJwtToken } from '@/common/utils/jwt';
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
}
