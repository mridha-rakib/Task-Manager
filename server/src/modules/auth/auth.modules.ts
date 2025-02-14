import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

export { authRepository, authController };
