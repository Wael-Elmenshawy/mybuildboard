import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCertificate,
  type CreateCertificateRequest,
} from "../api/certificateApi";

export function useCreateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateCertificateRequest,
    ) => createCertificate(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificates"],
      });
    },
  });
}
