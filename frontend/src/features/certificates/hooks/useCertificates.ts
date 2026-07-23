import { useQuery } from "@tanstack/react-query";

import { getMyCertificates } from "../api/certificateApi";

export function useCertificates() {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getMyCertificates,
  });
}
