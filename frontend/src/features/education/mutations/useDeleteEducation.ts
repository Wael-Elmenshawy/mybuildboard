import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteEducation } from "../api/educationApi";

export function useDeleteEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (educationId: string) =>
      deleteEducation(educationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["education"],
      });
    },
  });
}
