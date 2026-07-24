import { apiClient } from "@/services/api/client";

export interface PortfolioResponse {
  profile: any;
  projects: any[];
  skills: any[];
  experiences: any[];
  educations: any[];
  certificates: any[];
  social_links: any[];
}

export function getPortfolio(slug: string) {
  return apiClient.get<PortfolioResponse>(
    `/portfolio/${slug}`
  );
}
