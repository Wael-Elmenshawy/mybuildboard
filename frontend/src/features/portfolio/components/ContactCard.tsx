import {
  FaEnvelope,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

type ContactCardProps = {
  profile: any;
};

export default function ContactCard({
  profile,
}: ContactCardProps) {
  return (
    <section
      id="contact"
      className="rounded-2xl border bg-white p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">
        Contact
      </h2>

      <div className="space-y-5">
        {profile?.email && (
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <FaEnvelope />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-medium">
                {profile.email}
              </p>
            </div>
          </div>
        )}

        {profile?.phone && (
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <FaPhone />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Phone
              </p>

              <p className="font-medium">
                {profile.phone}
              </p>
            </div>
          </div>
        )}

        {profile?.location && (
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Location
              </p>

              <p className="font-medium">
                {profile.location}
              </p>
            </div>
          </div>
        )}

        {profile?.website && (
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
              <FaGlobe />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Website
              </p>

              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {profile.website}
              </a>
            </div>
          </div>
        )}

        {profile?.linkedin_url && (
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
              <FaLinkedin />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                LinkedIn
              </p>

              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
