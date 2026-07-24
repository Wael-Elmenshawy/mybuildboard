import StatCard from "./StatCard";
import { dashboardCards } from "../config/dashboardCards";

interface DashboardStatsProps {
  stats: {
    projects: number;
    skills: number;
    experiences: number;
    educations: number;
    certificates: number;
  };
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  const values = {
    projects: stats.projects,
    skills: stats.skills,
    experiences: stats.experiences,
    educations: stats.educations,
    certificates: stats.certificates,
  };

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
      {dashboardCards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={values[card.key]}
          icon={card.icon}
          iconClassName={card.iconClassName}
        />
      ))}
    </section>
  );
}
