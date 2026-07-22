import { useQuery } from "@tanstack/react-query";

import { getProjects } from "../api/projectApi";

export function useProjects(boardId: string) {
  return useQuery({
    queryKey: ["projects", boardId],

    queryFn: () => getProjects(boardId),

    enabled: !!boardId,
  });
}
