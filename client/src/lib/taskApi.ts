import { AxiosResponse } from "axios";

import API from "./axios-client";

export type TaskType = {
  _id?: string | undefined;
  user?: string;
  title?: string;
  description?: string;
  dueDate?: Date;
  status?: "pending" | "complete";
  completed?: boolean;
};

export const createTaskMutationFn = async (data: TaskType) =>
  await API.post("/task/create", data);

export const getTasksMutationFn = async (): Promise<
  AxiosResponse<TaskType[]>
> => await API.post("/task");

export const getTaskMutationFn = async (
  id: string
): Promise<AxiosResponse<TaskType>> => await API.post(`/task/${id}`);

export const updateTaskMutationFn = async (data: TaskType) =>
  await API.put(`/task/${data._id}`);
