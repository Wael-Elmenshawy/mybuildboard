import { useCallback, useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import ProfileDialog from "../components/ProfileDialog";
import ProfileForm from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";
import type { Profile } from "../types/profile";

function ProfilePage() {
  const [open, setOpen] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
  } = useProfile();

  const currentProfile: Profile | null =
    profile ?? null;

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const avatarLetter = useMemo(() => {
    return (
      currentProfile?.full_name
        ?.trim()
        ?.charAt(0)
        ?.toUpperCase() ?? "U"
    );
  }, [currentProfile]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">
            Profile
          </h1>

          <p className="text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">
            Profile
          </h1>

          <p className="text-red-500">
            Failed to load profile.
          </p>

          <div>
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your public developer
              profile.
            </p>
          </div>

          <Button
            onClick={openDialog}
            className="md:w-auto"
          >
            {currentProfile
              ? "Edit Profile"
              : "Create Profile"}
          </Button>
        </div>
	        {!currentProfile ? (
          <Card className="border-2 border-dashed border-gray-300 py-16 text-center">
            <h2 className="text-2xl font-semibold">
              No profile found
            </h2>

            <p className="mt-3 text-gray-500">
              Create your public profile to
              complete your developer
              portfolio.
            </p>

            <div className="mt-6">
              <Button onClick={openDialog}>
                Create Profile
              </Button>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              {currentProfile.avatar_url ? (
                <img
                  src={currentProfile.avatar_url}
                  alt={
                    currentProfile.full_name ??
                    "Profile avatar"
                  }
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold text-slate-700">
                  {avatarLetter}
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-3xl font-bold">
                  {currentProfile.full_name ??
                    "Unnamed"}
                </h2>

                <p className="mt-2 text-lg text-gray-500">
                  {currentProfile.headline ??
                    "No headline"}
                </p>

                <div className="mt-4 inline-flex rounded-full bg-gray-100 px-4 py-1 text-sm font-medium">
                  {currentProfile.is_public
                    ? "🌍 Public"
                    : "🔒 Private"}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-8">
              <section>
                <h3 className="text-lg font-semibold">
                  Bio
                </h3>

                <p className="mt-2 leading-7 text-gray-600">
                  {currentProfile.bio ??
                    "No biography provided."}
                </p>
              </section>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">
                    Website
                  </h3>

                  {currentProfile.website ? (
                    <a
                      href={currentProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block break-all text-blue-600 hover:underline"
                    >
                      {currentProfile.website}
                    </a>
                  ) : (
                    <p className="mt-2 text-gray-500">
                      -
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">
                    Location
                  </h3>

                  <p className="mt-2 text-gray-600">
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

                  <p className="mt-2 text-gray-600">
                    {currentProfile.timezone ??
                      "-"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Visibility
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {currentProfile.is_public
                      ? "Public"
                      : "Private"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
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
          profile={
            currentProfile ?? undefined
          }
          onSuccess={closeDialog}
        />
      </ProfileDialog>
    </>
  );
}

export default ProfilePage;
