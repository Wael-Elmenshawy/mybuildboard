import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "../api/projectApi";

export function useDeleteProject(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteProject(slug),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", boardId],
      });
    },
  });
}
