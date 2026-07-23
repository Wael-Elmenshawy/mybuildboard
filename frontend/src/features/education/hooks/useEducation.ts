import { useQuery } from "@tanstack/react-query";

import { getMyEducation } from "../api/educationApi";

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: getMyEducation,
  });
}
