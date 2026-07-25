import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProfile,
  type CreateProfileRequest,
} from "../api/profileApi";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProfileRequest) =>
      createProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}
