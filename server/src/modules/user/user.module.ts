import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

const userRepository = new UserRepository();

const userController = new UserController(userRepository);

export { userController, userRepository };
