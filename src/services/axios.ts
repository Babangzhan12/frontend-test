import axios from "axios";
import { APP_BASE_URL } from "../config/constants";

const api = axios.create({
  baseURL: APP_BASE_URL,
    headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,

  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return Promise.reject(err);
          }

          const rs = await api.post("/auth/refresh-token", {
            refreshToken,
          });

          localStorage.setItem("token", rs.data.token);
          localStorage.setItem("refreshToken", rs.data.refreshToken);

          originalConfig.headers["Authorization"] = `Bearer ${rs.data.token}`;
          return api(originalConfig);

        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
