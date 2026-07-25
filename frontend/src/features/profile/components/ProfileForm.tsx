import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Profile } from "../types/profile";
import type { ProfileFormValues } from "../schema/profileSchema";

import { useCreateProfile } from "../mutations/useCreateProfile";
import { useUpdateProfile } from "../mutations/useUpdateProfile";

type ProfileFormProps = {
  profile?: Profile;

  onSuccess?: () => void;
};

function ProfileForm({
  profile,
  onSuccess,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ProfileFormValues>();

  const createProfile = useCreateProfile();

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name,
        headline: profile.headline,
        bio: profile.bio,
        cover_url: profile.cover_url,
        website: profile.website,
        country: profile.country,
        city: profile.city,
        timezone: profile.timezone,
        is_public: profile.is_public,
      });
    } else {
      reset({
        full_name: "",
        headline: "",
        bio: "",
        cover_url: "",
        website: "",
        country: "",
        city: "",
        timezone: "",
        is_public: true,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (
    data: ProfileFormValues,
  ) => {
    if (profile) {
      await updateProfile.mutateAsync(data);
    } else {
      await createProfile.mutateAsync(data);
    }

    onSuccess?.();
  };

  const loading =
    createProfile.isPending ||
    updateProfile.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <input
          {...register("full_name")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Headline
        </label>

        <input
          {...register("headline")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Bio
        </label>

        <textarea
          rows={5}
          {...register("bio")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Website
        </label>

        <input
          {...register("website")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Cover URL
        </label>

        <input
          {...register("cover_url")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-medium">
            Country
          </label>

          <input
            {...register("country")}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            City
          </label>

          <input
            {...register("city")}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Timezone
        </label>

        <input
          {...register("timezone")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("is_public")}
        />

        <label>Public Profile</label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : profile
              ? "Update Profile"
              : "Create Profile"}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
