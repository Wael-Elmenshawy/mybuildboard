import { useState } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import ProfileDialog from "../components/ProfileDialog";
import ProfileForm from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";
import type { Profile } from "../types/profile";


function ProfilePage() {
  const [open, setOpen] = useState(false);

  const { data: profile, isLoading, isError } =
    useProfile();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-4">
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-4 text-red-500">
          Failed to load profile.
        </p>
      </div>
    );
  }

  const currentProfile =
    profile as Profile | null;

  return (
    <>
      <div className="mx-auto max-w-5xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your public developer
              profile.
            </p>
          </div>

          <button
            onClick={openDialog}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            {currentProfile
              ? "Edit Profile"
              : "Create Profile"}
          </button>
        </div>

        {!currentProfile ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No profile found
            </h2>

            <p className="mt-3 text-gray-500">
              Create your public profile to
              complete your developer
              portfolio.
            </p>

            <button
              onClick={openDialog}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              Create Profile
            </button>
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold">
                {currentProfile.full_name?.charAt(
                  0,
                ) ?? "U"}
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {currentProfile.full_name}
                </h2>

                <p className="mt-2 text-lg text-gray-500">
                  {currentProfile.headline}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold">
                  Bio
                </h3>

                <p className="mt-2 text-gray-600">
                  {currentProfile.bio ??
                    "-"}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">
                    Website
                  </h3>

                  <p className="mt-2">
                    {currentProfile.website ??
                      "-"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Location
                  </h3>

                  <p className="mt-2">
                    {currentProfile.city ??
                      "-"}
                    {" - "}
                    {currentProfile.country ??
                      "-"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Timezone
                  </h3>

                  <p className="mt-2">
                    {currentProfile.timezone ??
                      "-"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Visibility
                  </h3>

                  <p className="mt-2">
                    {currentProfile.is_public
                      ? "Public"
                      : "Private"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProfileDialog
        open={open}
        title={
          currentProfile
            ? "Edit Profile"
            : "Create Profile"
        }
        onClose={closeDialog}
      >
        <ProfileForm
          profile={currentProfile ?? undefined}
          onSuccess={closeDialog}
        />
      </ProfileDialog>
    </>
  );
}

export default ProfilePage;
