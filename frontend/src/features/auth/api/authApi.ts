import { apiClient, ENDPOINTS } from "@/services/api";

import type { LoginRequest, LoginResponse } from "../types";

export async function login(
  payload: LoginRequest
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append("username", payload.username);
  formData.append("password", payload.password);

  return apiClient.post<LoginResponse>(
    ENDPOINTS.auth.login,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
}
