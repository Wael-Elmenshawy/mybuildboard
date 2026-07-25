export type Profile = {
  id: string;
  user_id: string;

  full_name: string | null;
  headline: string | null;
  bio: string | null;

  avatar_url: string | null;
  cover_url: string | null;

  website: string | null;

  country: string | null;
  city: string | null;
  timezone: string | null;

  is_public: boolean;
};

export type UpdateProfileRequest = {
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
