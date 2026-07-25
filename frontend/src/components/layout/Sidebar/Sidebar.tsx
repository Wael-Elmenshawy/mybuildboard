import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Hammer,
  LayoutDashboard,
  Settings,
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
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-8 py-8">
        <h1 className="text-3xl font-black tracking-tight">
          <span className="text-primary">My</span>BuildBoard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Build • Showcase • Grow
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {navigation.map((group) => (
          <div
            key={group.section}
            className="mb-8"
          >
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
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
                      `flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon
                      size={20}
                      strokeWidth={2}
                    />

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 p-5">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-indigo-600 p-6 text-white shadow-xl">
          <h3 className="text-lg font-bold">
            Profile Completion
          </h3>

          <p className="mt-2 text-sm text-white/90">
            You're almost there.
            Complete your profile and publish your developer board.
          </p>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs">
              <span>95%</span>
              <span>Complete</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-[95%] rounded-full bg-white" />
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-white py-3 font-semibold text-primary transition hover:scale-[1.02]">
            Continue
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
