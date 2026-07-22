import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProject,
  type CreateProjectRequest,
} from "../api/projectApi";

export function useCreateProject(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectRequest) =>
      createProject(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", boardId],
      });
    },
  });
}
