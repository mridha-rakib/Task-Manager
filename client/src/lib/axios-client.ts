import axios from "axios";

import { env } from "../env";

const options = {
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
};
console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
const API = axios.create(options);

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { data, status } = error.response;
      if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
        try {
          await APIRefresh.get("/auth/refresh");
          return APIRefresh(error.config);
        } catch (error) {
          window.location.href = "/";
        }
      }
      return Promise.reject({
        ...data,
      });
    } else {
      return Promise.reject({
        message: "Network error or server not responding",
      });
    }
  }
);
export default API;
