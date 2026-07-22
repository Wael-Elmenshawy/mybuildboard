const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Technical Recruiter",
    quote:
      "MyBuildBoard gives developers one professional place to showcase everything they have built.",
  },
  {
    name: "Michael Chen",
    role: "Engineering Manager",
    quote:
      "Instead of asking for GitHub, LinkedIn and Resume separately, I only needed one link.",
  },
  {
    name: "David Wilson",
    role: "Cloud Architect",
    quote:
      "A modern portfolio that actually demonstrates technical skills instead of just listing them.",
  },
];

function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black">
            Trusted by Developers & Recruiters
          </h2>

          <p className="mt-4 text-muted-foreground">
            Early feedback from professionals who explored the MyBuildBoard
            concept.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 text-2xl">★★★★★</div>

              <p className="italic text-muted-foreground">
                "{item.quote}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold">{item.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
