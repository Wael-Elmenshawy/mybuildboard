type ProjectsSectionProps = {
  projects: any[];
};

export default function ProjectsSection({
  projects,
}: ProjectsSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-slate-500">
          No projects added yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project: any) => (
            <article
              key={project.id}
              className="rounded-xl border p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">
                {project.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {project.description}
              </p>

              {project.technologies?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block text-blue-600 hover:underline"
                >
                  View Project →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
