import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Education } from "../types/education";

export type CreateEducationRequest = {
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
  grade?: string;
  description?: string;
  is_current: boolean;
  display_order: number;
};

export async function getMyEducation() {
  return apiClient.get<Education[]>(
    ENDPOINTS.education.me,
  );
}

export async function createEducation(
  payload: CreateEducationRequest,
) {
  return apiClient.post<Education>(
    ENDPOINTS.education.base,
    payload,
  );
}

export async function updateEducation(
  educationId: string,
  payload: Partial<CreateEducationRequest>,
) {
  return apiClient.patch<Education>(
    ENDPOINTS.education.byId(
      educationId,
    ),
    payload,
  );
}

export async function deleteEducation(
  educationId: string,
) {
  return apiClient.delete<void>(
    ENDPOINTS.education.byId(
      educationId,
    ),
  );
}
