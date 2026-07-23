import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteExperience } from "../api/experienceApi";

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (experienceId: string) =>
      deleteExperience(experienceId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
}
