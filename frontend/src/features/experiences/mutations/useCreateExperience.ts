import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createExperience,
  type CreateExperienceRequest,
} from "../api/experienceApi";

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExperienceRequest) =>
      createExperience(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },
  });
}
