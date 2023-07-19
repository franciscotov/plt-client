import { validateSession } from "@/utils/utils";
import axios from "axios";

export const api = axios.create();
// Request interceptor
api.interceptors.request.use(
  async (config) => {
    validateSession();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.data.key === "INVALID_TOKEN" ||
        error.response.data.key === "JWT_EXPIRED")
    ) {
      // clearLocalStorage();
      window.location.href = "/login";
    }
    return { error, data: "error" };
  }
);
