import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Board } from "../types/board";

export async function getBoards() {
  return apiClient.get<Board[]>(
    ENDPOINTS.boards.base,
  );
}
