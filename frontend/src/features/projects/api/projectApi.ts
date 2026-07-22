import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Project } from "../types/project";

export async function getProjects(boardId: string) {
  return apiClient.get<Project[]>(
    ENDPOINTS.projects.byBoard(boardId),
  );
}
