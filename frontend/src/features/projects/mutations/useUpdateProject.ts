import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "../api/projectApi";

export function useUpdateProject(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: Parameters<typeof updateProject>[1];
    }) => updateProject(slug, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", boardId],
      });
    },
  });
}
