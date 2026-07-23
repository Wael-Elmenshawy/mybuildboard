import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteCertificate } from "../api/certificateApi";

export function useDeleteCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      certificateId: string,
    ) => deleteCertificate(certificateId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });
    },
  });
}
