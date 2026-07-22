const features = [
  {
    icon: "🚀",
    title: "One Developer Identity",
    description:
      "Bring GitHub, LinkedIn, Resume, Certificates and Projects into one beautiful developer identity.",
  },
  {
    icon: "⚡",
    title: "Live Portfolio",
    description:
      "Your portfolio updates automatically whenever your connected platforms change.",
  },
  {
    icon: "🌐",
    title: "Powerful Integrations",
    description:
      "Connect GitHub, LinkedIn, AWS, Azure, Docker and many more services from one place.",
  },
  {
    icon: "📈",
    title: "Career Timeline",
    description:
      "Show your experience, education, certifications and achievements in one visual timeline.",
  },
  {
    icon: "🎯",
    title: "Recruiter Friendly",
    description:
      "Share one professional link instead of sending multiple profiles and documents.",
  },
  {
    icon: "🛡️",
    title: "Always Up To Date",
    description:
      "Keep everything synchronized so recruiters always see your latest work.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-28"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why MyBuildBoard?
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight">
            Everything You Need To
            <br />
            Showcase Your Career
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Build one modern developer identity that combines your projects,
            skills, certifications, experience and online presence into a
            beautiful portfolio.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
