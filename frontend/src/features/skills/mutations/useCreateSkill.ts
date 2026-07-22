import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createSkill,
  type CreateSkillRequest,
} from "../api/skillApi";

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSkillRequest) =>
      createSkill(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
}
