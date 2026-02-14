import axios from "axios";
import { getToken, clearToken } from "../auth/tokenStore";

export const API_BASE_URL = "http://192.168.100.77:3000/api";

let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      await clearToken();
      onUnauthorized?.();
    }
    return Promise.reject(err);
  },
);