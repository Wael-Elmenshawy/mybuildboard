import { Link } from "react-router-dom";
import {
  Award,
  Briefcase,
  FolderPlus,
  GraduationCap,
  User,
} from "lucide-react";

const actions = [
  {
    title: "New Project",
    icon: FolderPlus,
    to: "/projects",
    color: "bg-cyan-500",
  },
  {
    title: "Add Skill",
    icon: Award,
    to: "/skills",
    color: "bg-violet-500",
  },
  {
    title: "Add Experience",
    icon: Briefcase,
    to: "/experiences",
    color: "bg-emerald-500",
  },
  {
    title: "Add Education",
    icon: GraduationCap,
    to: "/educations",
    color: "bg-orange-500",
  },
  {
    title: "Edit Profile",
    icon: User,
    to: "/profile",
    color: "bg-rose-500",
  },
];

function QuickActions() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex flex-col items-center rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <span className="text-center font-semibold">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
