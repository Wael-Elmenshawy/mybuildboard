function GitHubPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          GitHub Integration
        </h1>

        <p className="mt-3 text-slate-500">
          Connect your GitHub account and import repositories directly into
          MyBuildBoard.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <h2 className="text-2xl font-semibold text-slate-800">
          GitHub is not connected
        </h2>

        <p className="mt-4 text-slate-500">
          In the next steps, you'll be able to authenticate with GitHub,
          synchronize repositories, and import projects into your portfolio.
        </p>

        <button
          type="button"
          className="mt-8 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          Connect GitHub
        </button>
      </div>
    </div>
  );
}

export default GitHubPage;
