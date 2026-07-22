import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type {
  CreateSocialLinkRequest,
  SocialLink,
  UpdateSocialLinkRequest,
} from "../types/socialLink";

export async function getMySocialLinks() {
  return apiClient.get<SocialLink[]>(
    ENDPOINTS.socialLinks.me,
  );
}

export async function createSocialLink(
  data: CreateSocialLinkRequest,
) {
  return apiClient.post<SocialLink>(
    ENDPOINTS.socialLinks.base,
    data,
  );
}

export async function updateSocialLink(
  socialLinkId: string,
  data: UpdateSocialLinkRequest,
) {
  return apiClient.patch<SocialLink>(
    `${ENDPOINTS.socialLinks.base}/${socialLinkId}`,
    data,
  );
}

export async function deleteSocialLink(
  socialLinkId: string,
) {
  return apiClient.delete(
    `${ENDPOINTS.socialLinks.base}/${socialLinkId}`,
  );
}
