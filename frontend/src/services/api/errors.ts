import { AxiosError } from "axios";

export interface ApiErrorShape {
  detail: string;
  status: number;
}

export function parseApiError(error: unknown): ApiErrorShape {
  if (error instanceof AxiosError) {
    return {
      detail:
        (error.response?.data as { detail?: string })?.detail ??
        "Something went wrong.",
      status: error.response?.status ?? 0,
    };
  }

  return {
    detail: "Unexpected error.",
    status: 0,
  };
}
