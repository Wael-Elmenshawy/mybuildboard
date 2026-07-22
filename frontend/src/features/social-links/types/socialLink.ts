export const SocialPlatform = {
  GITHUB: "github",
  LINKEDIN: "linkedin",
  TWITTER: "twitter",
  WEBSITE: "website",
  YOUTUBE: "youtube",
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
  DRIBBBLE: "dribbble",
  BEHANCE: "behance",
  OTHER: "other",
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];

export interface SocialLink {
  id: string;
  user_id: string;

  platform: SocialPlatform;

  url: string;

  display_order: number;
}

export interface CreateSocialLinkRequest {
  platform: SocialPlatform;

  url: string;

  display_order?: number;
}

export interface UpdateSocialLinkRequest {
  platform?: SocialPlatform;

  url?: string;

  display_order?: number;
}
