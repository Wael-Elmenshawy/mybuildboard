import {
  Activity,
  Award,
  Briefcase,
  FolderKanban,
  User,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Created a new project",
    description: "MyBuildBoard Frontend",
    icon: FolderKanban,
    color: "bg-cyan-100 text-cyan-600",
    time: "5 min ago",
  },
  {
    id: 2,
    title: "Added a new skill",
    description: "React + TypeScript",
    icon: Award,
    color: "bg-violet-100 text-violet-600",
    time: "20 min ago",
  },
  {
    id: 3,
    title: "Updated experience",
    description: "MUHC Internship",
    icon: Briefcase,
    color: "bg-emerald-100 text-emerald-600",
    time: "Yesterday",
  },
  {
    id: 4,
    title: "Edited profile",
    description: "Profile information updated",
    icon: User,
    color: "bg-rose-100 text-rose-600",
    time: "2 days ago",
  },
];

function RecentActivity() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Activity className="text-cyan-600" />

        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-gray-400">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentActivity;
