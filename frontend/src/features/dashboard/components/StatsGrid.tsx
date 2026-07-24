import {
  FaCertificate,
  FaFolderOpen,
  FaTools,
  FaUserCheck,
} from "react-icons/fa";

import AppCard from "@/components/ui/AppCard";

type StatsGridProps = {
  totalProjects: number;
  totalSkills: number;
  totalCertificates: number;
  profileCompletion: number;
};

export default function StatsGrid({
  totalProjects,
  totalSkills,
  totalCertificates,
  profileCompletion,
}: StatsGridProps) {
  const stats = [
    {
      title: "Projects",
      value: totalProjects,
      icon: <FaFolderOpen className="text-3xl text-cyan-500" />,
    },
    {
      title: "Skills",
      value: totalSkills,
      icon: <FaTools className="text-3xl text-green-500" />,
    },
    {
      title: "Certificates",
      value: totalCertificates,
      icon: <FaCertificate className="text-3xl text-amber-500" />,
    },
    {
      title: "Profile Completion",
      value: `${profileCompletion}%`,
      icon: <FaUserCheck className="text-3xl text-purple-500" />,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AppCard key={stat.title}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                {stat.value}
              </h2>
            </div>

            {stat.icon}
          </div>
        </AppCard>
      ))}
    </div>
  );
}
