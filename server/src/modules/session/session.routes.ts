import { Router } from 'express';
import { sessionController } from './session.module';

const sessionRouter: Router = Router();

sessionRouter.route('/all').get(sessionController.getAllSession);
sessionRouter.route('/').get(sessionController.getSession);
sessionRouter.route('/:id').delete(sessionController.deleteSession);

export default sessionRouter;
