import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { uploadAvatar } from "../api/profileApi";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      uploadAvatar(file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
}
