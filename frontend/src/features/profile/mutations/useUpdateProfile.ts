import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateProfile,
  type UpdateProfileRequest,
} from "../api/profileApi";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: UpdateProfileRequest,
    ) => updateProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}
