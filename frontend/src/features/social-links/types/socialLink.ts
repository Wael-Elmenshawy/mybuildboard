export enum SocialPlatform {
  GITHUB = "github",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
  WEBSITE = "website",
  YOUTUBE = "youtube",
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  DRIBBBLE = "dribbble",
  BEHANCE = "behance",
  OTHER = "other",
}

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
