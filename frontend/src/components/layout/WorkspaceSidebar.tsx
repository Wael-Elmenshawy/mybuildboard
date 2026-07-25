import {
  FaBriefcase,
  FaChartBar,
  FaFolderOpen,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";

const navigation = [
  { label: "Home", icon: FaHome, active: true },
  { label: "Projects", icon: FaFolderOpen, active: false },
  { label: "Analytics", icon: FaChartBar, active: false },
  { label: "Portfolio", icon: FaBriefcase, active: false },
  { label: "Profile", icon: FaUser, active: false },
];

export default function WorkspaceSidebar() {
  return (
    <aside className="flex h-full flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="border-b border-white/10 p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-xl font-bold shadow-lg shadow-cyan-500/30">
            M
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              MyBuildBoard
            </h1>

            <p className="text-sm text-slate-400">
              Premium Workspace
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3 p-5">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`group flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                item.active
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="text-lg transition group-hover:scale-110" />

              <span className="font-semibold">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-5">
        <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 p-5 shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <span className="font-bold">
              Premium
            </span>
          </div>

          <p className="mt-3 text-sm text-cyan-100">
            Complete your portfolio and publish your professional developer board.
          </p>

          <button className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-sky-700 transition hover:scale-[1.02]">
            Upgrade Portfolio
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            W
          </div>

          <div>
            <p className="font-semibold">
              Wael
            </p>

            <p className="text-sm text-slate-400">
              Cloud Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
