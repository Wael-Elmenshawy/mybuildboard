import { useQuery } from "@tanstack/react-query";

import {
  connectGitHub,
  getGitHubRepositories,
} from "../api/githubApi";

export function useGitHubRepositories() {
  return useQuery({
    queryKey: ["github", "repositories"],
    queryFn: getGitHubRepositories,
  });
}

export function useGitHubConnection() {
  return useQuery({
    queryKey: ["github", "connect"],
    queryFn: connectGitHub,
    enabled: false,
  });
}
