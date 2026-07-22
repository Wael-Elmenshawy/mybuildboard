import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Skill } from "../types/skill";

export type CreateSkillRequest = {
  name: string;
  level:
    | "beginner"
    | "intermediate"
    | "advanced"
    | "expert";

  display_order: number;
};

export async function getMySkills() {
  return apiClient.get<Skill[]>(
    ENDPOINTS.skills.me,
  );
}

export async function createSkill(
  payload: CreateSkillRequest,
) {
  return apiClient.post<Skill>(
    ENDPOINTS.skills.base,
    payload,
  );
}

export async function updateSkill(
  skillId: string,
  payload: Partial<CreateSkillRequest>,
) {
  return apiClient.patch<Skill>(
    ENDPOINTS.skills.byId(skillId),
    payload,
  );
}

export async function deleteSkill(
  skillId: string,
) {
  return apiClient.delete<void>(
    ENDPOINTS.skills.byId(skillId),
  );
}
