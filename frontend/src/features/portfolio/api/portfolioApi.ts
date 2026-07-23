import api from "@/lib/api";

export interface PortfolioResponse {
  profile: unknown;
  skills: unknown[];
  experiences: unknown[];
  educations: unknown[];
  certificates: unknown[];
  projects: unknown[];
  social_links: unknown[];
}

export async function getPortfolio(slug: string) {
  const { data } = await api.get<PortfolioResponse>(
    `/portfolio/${slug}`,
  );

  return data;
}
