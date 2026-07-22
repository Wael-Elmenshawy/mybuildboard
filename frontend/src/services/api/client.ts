import type { AxiosRequestConfig } from "axios";

import { axiosInstance } from "./axios";
import { parseApiError, type ApiErrorShape } from "./errors";

export class ApiRequestError extends Error {
  status: number;

  constructor(error: ApiErrorShape) {
    super(error.detail);
    this.status = error.status;
  }
}

async function request<T>(promise: Promise<{ data: T }>): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw new ApiRequestError(parseApiError(error));
  }
}

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(axiosInstance.get(url, config)),

  post: <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ) =>
    request<T>(axiosInstance.post(url, body, config)),

  patch: <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ) =>
    request<T>(axiosInstance.patch(url, body, config)),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(axiosInstance.delete(url, config)),
};
