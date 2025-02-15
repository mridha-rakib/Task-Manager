import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';

const sessionRepository = new SessionRepository();
const sessionController = new SessionController(sessionRepository);

export { sessionRepository, sessionController };
