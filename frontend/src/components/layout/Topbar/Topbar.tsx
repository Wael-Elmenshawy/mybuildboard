import { Bell, Search, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Wael 👋
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden h-11 w-80 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 lg:flex">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search projects, skills..."
              className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <button className="relative rounded-2xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white">
              W
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold text-slate-900">
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
