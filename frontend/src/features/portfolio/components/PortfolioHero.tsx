import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";

type PortfolioHeroProps = {
  profile: any;
};

export default function PortfolioHero({
  profile,
}: PortfolioHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
      }}
      className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <motion.img
          whileHover={{
            scale: 1.08,
            rotate: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          src={
            profile?.avatar_url ??
            "https://placehold.co/160x160"
          }
          alt="Avatar"
          className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
        />

        <div className="flex-1">
          <h1 className="text-5xl font-bold">
            {profile?.full_name ?? "Unknown User"}
          </h1>

          <p className="mt-3 text-xl text-slate-300">
            {profile?.headline ??
              "Cloud & Software Engineer"}
          </p>

          <p className="mt-6 max-w-3xl leading-8 text-slate-200">
            {profile?.bio ??
              "Welcome to my professional portfolio."}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
            {profile?.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                {profile.location}
              </div>
            )}

            {profile?.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope />
                {profile.email}
              </div>
            )}

            {profile?.website && (
              <div className="flex items-center gap-2">
                <FaGlobe />
                {profile.website}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
