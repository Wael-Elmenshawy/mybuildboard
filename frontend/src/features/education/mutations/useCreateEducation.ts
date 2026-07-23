import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createEducation,
  type CreateEducationRequest,
} from "../api/educationApi";

export function useCreateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEducationRequest) =>
      createEducation(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["education"],
      });
    },
  });
}
