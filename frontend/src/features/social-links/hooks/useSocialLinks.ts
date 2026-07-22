import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createSocialLink,
  deleteSocialLink,
  getMySocialLinks,
  updateSocialLink,
} from "../api/socialLinkApi";

import type {
  CreateSocialLinkRequest,
  UpdateSocialLinkRequest,
} from "../types/socialLink";

const QUERY_KEY = ["social-links"];

export function useSocialLinks() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getMySocialLinks,
  });
}

export function useCreateSocialLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSocialLinkRequest) =>
      createSocialLink(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useUpdateSocialLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSocialLinkRequest;
    }) => updateSocialLink(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useDeleteSocialLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteSocialLink(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}
