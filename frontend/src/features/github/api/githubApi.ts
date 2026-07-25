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

export interface GitHubConnectResponse {
  authorization_url: string;
}

export function getGitHubRepositories() {
  return apiClient.get<GitHubRepository[]>("/api/v1/github/repositories");
}

export function connectGitHub() {
  return apiClient.get<GitHubConnectResponse>("/api/v1/github/connect");
}

export function importRepository(repositoryId: string) {
  return apiClient.post(`/projects/import-from-github?github_repo_id=${repositoryId}`);
}
