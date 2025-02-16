import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

export { taskRepository, taskController };
