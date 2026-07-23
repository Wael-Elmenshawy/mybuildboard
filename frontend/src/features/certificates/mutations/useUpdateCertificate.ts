import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateCertificate } from "../api/certificateApi";

export function useUpdateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      certificateId,
      payload,
    }: {
      certificateId: string;
      payload: Parameters<
        typeof updateCertificate
      >[1];
    }) =>
      updateCertificate(
        certificateId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });
    },
  });
}
