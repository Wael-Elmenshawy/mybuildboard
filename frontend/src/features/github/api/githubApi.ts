import { apiClient } from "@/services/api";

export interface GitHubRepository {
  id: string;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
}

export async function getGitHubRepositories(): Promise<GitHubRepository[]> {
  return await apiClient.get<GitHubRepository[]>("/github/repositories");
}

export async function connectGitHub(): Promise<{ authorization_url: string }> {
  return await apiClient.get<{ authorization_url: string }>("/github/connect");
}
