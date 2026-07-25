import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteAvatar } from "../api/profileApi";

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvatar,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}
