import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateExperience } from "../api/experienceApi";

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      experienceId,
      payload,
    }: {
      experienceId: string;
      payload: Parameters<typeof updateExperience>[1];
    }) =>
      updateExperience(
        experienceId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
}
