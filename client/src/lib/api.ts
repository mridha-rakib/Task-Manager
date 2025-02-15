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

export const loginMutationFn = async (data: LoginType) =>
  await API.post("/auth/login", data);

export const registerMutationFn = async (data: registerType) =>
  await API.post(`/auth/register`, data);

export const getUserSessionQueryFn = async () => await API.get(`/session/`);

export const verifyEmailMutationFn = async (data: verifyEmailType) =>
  await API.post(`/auth/verify/email`, data);
