import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.post["Access-Control-Allowed-Origin"] = "*";
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  config.headers.Authorization = accessToken;
  return config;
});
api.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      let data = response.data;
      return Promise.resolve(data);
    }
  },
  async (error) => {
    const { response, request } = error;
    if (response) {
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        window.location.href = "/";
      }
      if (response.status >= 400 && response.status < 500) {
        return Promise.reject(response.data);
      }
    } else if (request) {
      return null;
    }
    return Promise.reject(error);
  }
);

export default api;
