import API from "./axios-client";

type forgotPasswordType = { email: string };
type resetPasswordType = { password: string; verificationCode: string };
type LoginType = {
  email: string;
  password: string;
};
type registerType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type verifyEmailType = { code: string };

type SessionType = {
  _id: string;
  userId: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
};

type SessionResponseType = {
  message: string;
  sessions: SessionType[];
};

type TaskType = {
  user?: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: "pending" | "complete";
  completed?: boolean;
};

export const loginMutationFn = async (data: LoginType) =>
  await API.post("/auth/login", data);

export const registerMutationFn = async (data: registerType) =>
  await API.post(`/auth/register`, data);

export const verifyEmailMutationFn = async (data: verifyEmailType) =>
  await API.post(`/auth/verify/email`, data);

export const forgotPasswordMutationFn = async (data: forgotPasswordType) =>
  await API.post(`/auth/password/forgot`, data);

export const resetPasswordMutationFn = async (data: resetPasswordType) =>
  await API.post(`/auth/password/reset`, data);

export const logoutMutationFn = async () => await API.post(`/auth/logout`);

export const sessionsQueryFn = async () => {
  const response = await API.get<SessionResponseType>(`/session/all`);
  return response.data;
};

export const getUserSessionQueryFn = async () => await API.get(`/session/`);

export const sessionDeleteMutationFn = async (id: string) =>
  await API.delete(`/session/${id}`);
