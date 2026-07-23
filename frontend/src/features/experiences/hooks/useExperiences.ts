import { useQuery } from "@tanstack/react-query";

import { getMyExperiences } from "../api/experienceApi";

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getMyExperiences,
  });
}
