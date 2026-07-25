import {
  BriefcaseBusiness,
  FolderKanban,
  GitBranch,
  GraduationCap,
  Hammer,
  LayoutDashboard,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    section: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "PORTFOLIO",
    items: [
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        label: "Skills",
        href: "/skills",
        icon: Hammer,
      },
      {
        label: "Certificates",
        href: "/certificates",
        icon: GraduationCap,
      },
      {
        label: "Experience",
        href: "/experience",
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    section: "INTEGRATIONS",
    items: [
      {
        label: "GitHub",
        href: "/github",
        icon: GitBranch,
      },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-80 shrink-0 flex-col border-r border-slate-200 bg-white/85 backdrop-blur-xl">
      <div className="border-b border-slate-200 p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white shadow-lg">
            <Sparkles size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight">
              <span className="text-cyan-600">My</span>BuildBoard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Build • Showcase • Grow
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-8">
        {navigation.map((group) => (
          <div key={group.section} className="mb-10">
            <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              {group.section}
            </p>

            <div className="space-y-2">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl"
                          : "text-slate-600 hover:bg-slate-100 hover:translate-x-1 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon size={20} />

                    <span className="font-semibold">
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 p-6">
        <div className="rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-6 text-white shadow-2xl">
          <h3 className="text-lg font-bold">
            Profile Completion
          </h3>

          <p className="mt-2 text-sm text-white/90">
            Publish your portfolio and attract recruiters.
          </p>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span>95%</span>
              <span>Complete</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[95%] rounded-full bg-white" />
            </div>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-white py-3 font-bold text-cyan-700 transition hover:scale-[1.02]">
            Finish Profile
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

