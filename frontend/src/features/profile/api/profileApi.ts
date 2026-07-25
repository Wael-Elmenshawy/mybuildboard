import { apiClient } from "@/services/api";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { Profile } from "../types/profile";

export type CreateProfileRequest = {
  full_name?: string | null;
  headline?: string | null;
  bio?: string | null;
  cover_url?: string | null;
  website?: string | null;
  country?: string | null;
  city?: string | null;
  timezone?: string | null;
  is_public?: boolean;
};

export type UpdateProfileRequest =
  Partial<CreateProfileRequest>;

export async function getMyProfile() {
  return apiClient.get<Profile | null>(
    ENDPOINTS.profiles.me,
  );
}

export async function createProfile(
  payload: CreateProfileRequest,
) {
  return apiClient.post<Profile>(
    ENDPOINTS.profiles.base,
    payload,
  );
}

export async function updateProfile(
  payload: UpdateProfileRequest,
) {
  return apiClient.put<Profile>(
    ENDPOINTS.profiles.base,
    payload,
  );
}

export async function uploadAvatar(
  file: File,
) {
  const formData = new FormData();

  formData.append("file", file);

  return apiClient.post<Profile>(
    ENDPOINTS.profiles.avatar,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    },
  );
}

export async function deleteAvatar() {
  return apiClient.delete<void>(
    ENDPOINTS.profiles.avatar,
  );
}
