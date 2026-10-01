import axios, { InternalAxiosRequestConfig } from "axios";

// Base URLs for each live microservice — pulled from env vars so
// local dev and production can point at different hosts.
const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL as string;
const CATALOG_BASE_URL = process.env.NEXT_PUBLIC_CATALOG_API_URL as string;
const ORDERS_BASE_URL = process.env.NEXT_PUBLIC_ORDERS_API_URL as string;

export const authApi = axios.create({ baseURL: AUTH_BASE_URL });
export const catalogApi = axios.create({ baseURL: CATALOG_BASE_URL });
export const ordersApi = axios.create({ baseURL: ORDERS_BASE_URL });

const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

authApi.interceptors.request.use(attachToken);
catalogApi.interceptors.request.use(attachToken);
ordersApi.interceptors.request.use(attachToken);