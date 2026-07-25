import { Link } from "react-router-dom";
import {
  Award,
  Briefcase,
  FolderPlus,
  GraduationCap,
  User,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "New Project",
    description: "Create and showcase a new project",
    icon: FolderPlus,
    to: "/projects",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Add Skill",
    description: "Expand your technical profile",
    icon: Award,
    to: "/skills",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Experience",
    description: "Add your latest work experience",
    icon: Briefcase,
    to: "/experiences",
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Education",
    description: "Keep your education updated",
    icon: GraduationCap,
    to: "/educations",
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Profile",
    description: "Update your public profile",
    icon: User,
    to: "/profile",
    color: "from-rose-500 to-pink-600",
  },
];

function QuickActions() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-500">
            Frequently used shortcuts for your workspace.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl"
            >
              <div
                className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-cyan-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span>Open</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
