import { asyncHandler } from '@/middlewares/asyncHandler';
import type { SessionRepository } from './session.repository';
import { HTTPSTATUS } from '@/config/http-config';
import { NotFoundException } from '@/common/utils/catch-errors';
import { z } from 'zod';

export class SessionController {
  private _sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this._sessionRepository = sessionRepository;
  }

  public getAllSession = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const sessionId = req.sessionId;

    const { sessions } = await this._sessionRepository.getAllSession(userId);

    const modifySessions = sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === sessionId && {
        isCurrent: true,
      }),
    }));

    return res.status(HTTPSTATUS.OK).json({
      message: 'Retrieved all session successfully',
      sessions: modifySessions,
    });
  });

  public getSession = asyncHandler(async (req, res) => {
    const sessionId = req?.sessionId;

    if (!sessionId) {
      throw new NotFoundException('Session ID not found. Please log in.');
    }

    const { user } = await this._sessionRepository.getSessionById(sessionId);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Session retrieved successfully',
      user,
    });
  });

  public deleteSession = asyncHandler(async (req, res) => {
    const sessionId = z.string().parse(req.params.id);
    const userId = req.user?.id;
    await this._sessionRepository.deleteSession(sessionId, userId);

    return res.status(HTTPSTATUS.OK).json({
      message: 'Session remove successfully',
    });
  });
}
