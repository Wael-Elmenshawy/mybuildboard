function DashboardHeader() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 p-8 text-white shadow-2xl">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            🚀 MyBuildBoard Premium
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
            Welcome Back 👋
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-cyan-100">
            Manage your portfolio, GitHub repositories, projects, skills and
            professional profile from one beautiful workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-sky-700 transition hover:scale-[1.02]">
              Open Portfolio
            </button>

            <button className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
              GitHub Sync
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-cyan-100">Projects</p>

            <h2 className="mt-2 text-4xl font-bold">12</h2>

            <p className="mt-3 text-sm text-cyan-100">
              Ready for your portfolio
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-cyan-100">GitHub</p>

            <h2 className="mt-2 text-3xl font-bold">
              Connected
            </h2>

            <p className="mt-3 text-sm text-cyan-100">
              Automatic synchronization enabled
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardHeader;
