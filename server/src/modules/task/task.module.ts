import SessionModel from '@/database/models/session.model';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import TaskModel from '@/database/models/TaskModel';

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

export { taskRepository, taskController };
