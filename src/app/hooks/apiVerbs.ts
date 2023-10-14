import { ApiBody, ApiType } from "@/utils/interfaces/interfaces";
import { api } from "../services/interceptors";
import { AxiosRequestConfig } from "axios";
import { buildHeader } from "./basicParams";

const API_URL = process.env.NEXT_PUBLIC_API_APP;

const options = buildHeader();

export const apiType = {
  GET: ApiType.GET,
  POST: ApiType.POST,
  PUT: ApiType.PUT,
  DELETE: ApiType.DELETE,
};

export const GET = async <T>(url: string, params: any) => {
  return api.get<T>(`${API_URL}${url}`, params);
};

export const POST = async <T>(
  url: string,
  body: ApiBody,
  options?: AxiosRequestConfig
) => {
  return api.post<T>(`${API_URL}${url}`, body, options);
};

export const PUT = async <T>(
  url: string,
  body: ApiBody,
  options?: AxiosRequestConfig
) => {
  return api.put<T>(`${API_URL}${url}`, body, options);
};

export const DELETE = async (url: string) => {
  return api.delete(`${API_URL}${url}`, options);
};
