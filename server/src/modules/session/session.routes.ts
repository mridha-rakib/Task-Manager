import { Router } from 'express';
import { sessionController } from './session.module';
import { authenticateJWT } from '@/common/jwt.strategy.ts/jwt.strategy';

const sessionRouter: Router = Router();

sessionRouter
  .route('/all')
  .get(authenticateJWT, sessionController.getAllSession);
sessionRouter.route('/').get(authenticateJWT, sessionController.getSession);
sessionRouter
  .route('/:id')
  .delete(authenticateJWT, sessionController.deleteSession);

export default sessionRouter;
