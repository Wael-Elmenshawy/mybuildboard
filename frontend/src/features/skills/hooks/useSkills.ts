import { useQuery } from "@tanstack/react-query";

import { getMySkills } from "../api/skillApi";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],

    queryFn: getMySkills,
  });
}
