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
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-lg font-semibold shadow-sm">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
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

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <RecentProjects />
        <RecentActivity />
      </div>
    </div>
  );
}
