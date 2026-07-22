import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSkill } from "../api/skillApi";

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      skillId,
      payload,
    }: {
      skillId: string;
      payload: Parameters<typeof updateSkill>[1];
    }) => updateSkill(skillId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
}
