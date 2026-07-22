function PortfolioPreview() {
  const projects = [
    "Cloud Infrastructure",
    "Kubernetes Cluster",
    "CI/CD Pipeline",
    "Docker Platform",
  ];

  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black">
            Preview Your Developer Board
          </h2>

          <p className="mt-4 text-muted-foreground">
            Everything recruiters need in one beautiful place.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background p-8 shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left */}
            <div className="w-full lg:w-1/3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-black text-primary-foreground">
                  MB
                </div>

                <h3 className="text-2xl font-bold">
                  Wael ElMenshawy
                </h3>

                <p className="text-muted-foreground">
                  Cloud & DevOps Engineer
                </p>

                <button className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">
                  View My Board
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1">
              <h3 className="mb-6 text-xl font-bold">
                Featured Projects
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <div
                    key={project}
                    className="rounded-xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h4 className="font-semibold">
                      {project}
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Modern infrastructure, documentation,
                      screenshots and live demo.
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted p-4 text-center">
                  <h3 className="text-2xl font-black">152</h3>
                  <p className="text-sm text-muted-foreground">
                    Views
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-4 text-center">
                  <h3 className="text-2xl font-black">12</h3>
                  <p className="text-sm text-muted-foreground">
                    Projects
                  </p>
                </div>

                <div className="rounded-xl bg-muted p-4 text-center">
                  <h3 className="text-2xl font-black">24</h3>
                  <p className="text-sm text-muted-foreground">
                    Skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPreview;
