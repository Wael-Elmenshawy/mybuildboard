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

const DashboardStats = ({
  stats,
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
      {dashboardCards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={stats[card.key]}
          icon={card.icon}
          iconClassName={card.iconClassName}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
