function WelcomeBanner() {
  return (
    <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-muted-foreground">
            Here's an overview of your developer profile and recent activity.
          </p>
        </div>

        <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105">
          View My Public Board
        </button>
      </div>
    </section>
  );
}

export default WelcomeBanner;
