import {
  Bell,
  ChevronDown,
  Plus,
  Search,
} from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="flex h-24 items-center justify-between px-10">
        <div>
          <span className="rounded-full bg-cyan-100 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">
            MyBuildBoard
          </span>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Wael 👋
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden h-12 w-[420px] items-center rounded-2xl border border-slate-200 bg-white px-5 shadow-sm lg:flex">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search projects, skills, certificates..."
              className="ml-3 w-full bg-transparent text-sm outline-none"
            />
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-xl transition hover:scale-[1.03]">
            <Plus size={18} />
            New
          </button>

          <button className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 font-bold text-white">
              W
            </div>

            <div className="hidden text-left lg:block">
              <p className="font-bold text-slate-900">
                Wael
              </p>

              <p className="text-xs text-slate-500">
                Cloud Engineer
              </p>
            </div>

            <ChevronDown
              size={18}
              className="text-slate-500"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
