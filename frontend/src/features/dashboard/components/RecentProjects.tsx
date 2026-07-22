const projects = [
  {
    id: 1,
    name: "MyBuildBoard Backend",
    tech: "FastAPI • PostgreSQL",
  },
  {
    id: 2,
    name: "MyBuildBoard Frontend",
    tech: "React • TypeScript",
  },
  {
    id: 3,
    name: "Portfolio API",
    tech: "Cloudflare R2",
  },
];

function RecentProjects() {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Projects</h2>

        <button className="text-sm font-medium text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-border p-4 transition hover:bg-accent"
          >
            <h3 className="font-semibold">{project.name}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {project.tech}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentProjects;
