import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import type { Profile } from "../types/profile";
import {
  profileSchema,
  type ProfileFormValues,
} from "../schema/profileSchema";

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
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

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
      <Input
        label="Full Name"
        {...register("full_name")}
        error={errors.full_name?.message}
      />

      <Input
        label="Headline"
        {...register("headline")}
        error={errors.headline?.message}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Bio
        </label>

        <textarea
          rows={5}
          {...register("bio")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {errors.bio && (
          <span className="text-sm text-red-600">
            {errors.bio.message}
          </span>
        )}
      </div>

      <Input
        label="Website"
        {...register("website")}
        error={errors.website?.message}
      />

      <Input
        label="Cover URL"
        {...register("cover_url")}
        error={errors.cover_url?.message}
      />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Country"
          {...register("country")}
          error={errors.country?.message}
        />

        <Input
          label="City"
          {...register("city")}
          error={errors.city?.message}
        />
      </div>

      <Input
        label="Timezone"
        {...register("timezone")}
        error={errors.timezone?.message}
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("is_public")}
          className="h-4 w-4 rounded border-gray-300"
        />

        <label className="text-sm font-medium text-gray-700">
          Public Profile
        </label>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : profile
              ? "Update Profile"
              : "Create Profile"}
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;	
