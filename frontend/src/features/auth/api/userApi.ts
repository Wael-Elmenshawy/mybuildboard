import { apiClient, ENDPOINTS } from "@/services/api";

import type { AuthUser } from "../types";

export async function getCurrentUser(): Promise<AuthUser> {
  return apiClient.get<AuthUser>(ENDPOINTS.users.me);
}
