import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  connectGitHub,
  getGitHubRepositories,
  importRepository,
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

export function useImportRepository() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importRepository,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["github", "repositories"],
      });
    },
  });
}
