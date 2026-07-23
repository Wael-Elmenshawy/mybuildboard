import apiClient from "@/lib/api/client";

export interface DashboardStats {
  projects: number;
  skills: number;
  experiences: number;
  educations: number;
  certificates: number;
}

export interface RecentProject {
  id: string;
  title: string;
  updated_at: string;
}

export interface RecentActivity {
  type: string;
  title: string;
  created_at: string;
}

export interface DashboardResponse {
  profile_completion: number;
  stats: DashboardStats;
  recent_projects: RecentProject[];
  recent_activity: RecentActivity[];
}

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>(
    "/dashboard",
  );

  return response.data;
};
