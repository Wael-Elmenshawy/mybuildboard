import {
  FaBriefcase,
  FaChartBar,
  FaFolderOpen,
  FaHome,
  FaUser,
} from "react-icons/fa";

const navigation = [
  {
    label: "Home",
    icon: FaHome,
    active: true,
  },
  {
    label: "Projects",
    icon: FaFolderOpen,
    active: false,
  },
  {
    label: "Analytics",
    icon: FaChartBar,
    active: false,
  },
  {
    label: "Portfolio",
    icon: FaBriefcase,
    active: false,
  },
  {
    label: "Profile",
    icon: FaUser,
    active: false,
  },
];

export default function WorkspaceSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">
          MyBuildBoard
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Developer Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                transition-all
                ${
                  item.active
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }
              `}
            >
              <Icon className="text-lg" />

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            W
          </div>

          <div>
            <p className="font-semibold">
              Wael
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Cloud Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
