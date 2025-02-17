import SessionModel from '@/database/models/session.model';
import { NotFoundException, UnauthorizedException } from './catch-errors';
import TaskModel from '@/database/models/TaskModel';

export function isAuthorized(
  taskUser: string | undefined,
  currentUser: string
) {
  return taskUser === currentUser;
}

export async function validateSession(sessionId: string) {
  const session = await SessionModel.findById(sessionId)
    .populate('userId')
    .select('-expiresAt');

  if (!session) {
    throw new NotFoundException('User not found.');
  }

  return session;
}

export async function validateTask(taskId: string, userId: string) {
  const task = await TaskModel.findById(taskId);

  if (!task) {
    throw new NotFoundException('Task not found');
  }
  const tUserId = task.user?.toString();
  if (!isAuthorized(tUserId, userId)) {
    throw new UnauthorizedException('Unauthorized users');
  }

  return task;
}
