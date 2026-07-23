import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Experience } from "../types/experience";

export type CreateExperienceRequest = {
  company: string;
  position: string;
  employment_type:
    | "full_time"
    | "part_time"
    | "contract"
    | "freelance"
    | "internship"
    | "volunteer";
  location?: string;
  description?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  display_order: number;
};

export async function getMyExperiences() {
  return apiClient.get<Experience[]>(
    ENDPOINTS.experiences.me,
  );
}

export async function createExperience(
  payload: CreateExperienceRequest,
) {
  return apiClient.post<Experience>(
    ENDPOINTS.experiences.base,
    payload,
  );
}

export async function updateExperience(
  experienceId: string,
  payload: Partial<CreateExperienceRequest>,
) {
  return apiClient.patch<Experience>(
    ENDPOINTS.experiences.byId(experienceId),
    payload,
  );
}

export async function deleteExperience(
  experienceId: string,
) {
  return apiClient.delete<void>(
    ENDPOINTS.experiences.byId(experienceId),
  );
}
