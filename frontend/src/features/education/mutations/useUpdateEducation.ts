import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateEducation } from "../api/educationApi";

export function useUpdateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      educationId,
      payload,
    }: {
      educationId: string;
      payload: Parameters<
        typeof updateEducation
      >[1];
    }) =>
      updateEducation(
        educationId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["education"],
      });
    },
  });
}
