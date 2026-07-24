import { apiClient } from "@/services/api/client";
import { ENDPOINTS } from "@/services/api";

export interface DashboardSummary {
  total_projects: number;
  total_skills: number;
  total_certificates: number;
  profile_completion: number;
}

export function getDashboardSummary() {
  return apiClient.get<DashboardSummary>(
    ENDPOINTS.dashboard.summary
  );
}
