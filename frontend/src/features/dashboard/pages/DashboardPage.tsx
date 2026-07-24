import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import RecentProjects from "../components/RecentProjects";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats
        stats={{
          projects: data.total_projects,
          skills: data.total_skills,
          experiences: 0,
          educations: 0,
          certificates: data.total_certificates,
        }}
      />

      <QuickActions />

      <div className="grid gap-8 xl:grid-cols-2">
        <RecentProjects />
        <RecentActivity />
      </div>
    </div>
  );
}
