import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Project } from "../types/project";

export type CreateProjectRequest = {
  board_id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  video_url?: string;
  thumbnail_url?: string;
  technologies: string[];
  display_order: number;
  is_featured: boolean;
  visibility: "public" | "private";
  status: "published" | "draft";
};

export async function getProjects(boardId: string) {
  return apiClient.get<Project[]>(
    ENDPOINTS.projects.byBoard(boardId),
  );
}

export async function createProject(
  payload: CreateProjectRequest,
) {
  return apiClient.post<Project>(
    ENDPOINTS.projects.base,
    payload,
  );
}

export async function deleteProject(slug: string) {
  return apiClient.delete<void>(
    ENDPOINTS.projects.bySlug(slug),
  );
}

export async function updateProject(
  slug: string,
  payload: Partial<CreateProjectRequest>,
) {
  return apiClient.patch<Project>(
    ENDPOINTS.projects.bySlug(slug),
    payload,
  );
}
