import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteSkill } from "../api/skillApi";

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillId: string) =>
      deleteSkill(skillId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },
  });
}
