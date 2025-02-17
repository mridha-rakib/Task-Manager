import moment from "moment";

import { TaskType } from "@/lib/taskApi";

export const formatTime = (createdAt: string) => {
  const now = moment();
  const created = moment(createdAt);

  if (created.isSame(now, "day")) {
    return "Today";
  }

  if (created.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};

export const overdueTasks = (tasks: TaskType[]) => {
  const todayDate = moment();

  return tasks.filter((task) => {
    return !task.completed && moment(task.dueDate).isBefore(todayDate);
  });
};
