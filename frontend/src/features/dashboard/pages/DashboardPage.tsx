import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import RecentProjects from "../components/RecentProjects";
import StatsCard from "../components/StatsCard";
import WelcomeBanner from "../components/WelcomeBanner";

const stats = [
  { title: "Projects", value: 12 },
  { title: "Skills", value: 24 },
  { title: "Certificates", value: 8 },
  { title: "Profile Score", value: "95%" },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <WelcomeBanner />

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </section>

        <section className="grid gap-8 xl:grid-cols-2">
          <RecentProjects />
          <RecentActivity />
        </section>

        <QuickActions />
      </div>
    </div>
  );
}

export default DashboardPage;
