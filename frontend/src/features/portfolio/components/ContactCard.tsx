type ContactCardProps = {
  profile: any;
};

export default function ContactCard({
  profile,
}: ContactCardProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Contact
      </h2>

      <div className="space-y-4 text-slate-600">
        {profile?.email && (
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="text-blue-600 hover:underline"
            >
              {profile.email}
            </a>
          </div>
        )}

        {profile?.location && (
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Location
            </p>
            <p>{profile.location}</p>
          </div>
        )}

        {profile?.website && (
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Website
            </p>
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {profile.website}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
