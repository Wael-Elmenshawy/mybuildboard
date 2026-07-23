type PortfolioHeroProps = {
  profile: any;
};

export default function PortfolioHero({
  profile,
}: PortfolioHeroProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="flex items-center gap-6">
        <img
          src={
            profile?.avatar_url ??
            "https://placehold.co/120x120"
          }
          alt="Avatar"
          className="h-28 w-28 rounded-full object-cover border"
        />

        <div>
          <h1 className="text-4xl font-bold">
            {profile?.full_name ?? "Unknown User"}
          </h1>

          <p className="mt-2 text-slate-600">
            {profile?.headline ??
              "Cloud & Software Engineer"}
          </p>

          <p className="mt-4 max-w-3xl text-slate-500">
            {profile?.bio ??
              "Welcome to my professional portfolio."}
          </p>
        </div>
      </div>
    </section>
  );
}
