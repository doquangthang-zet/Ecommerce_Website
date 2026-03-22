import axios from "axios";
import { baseUrl } from "./baseUrl";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;