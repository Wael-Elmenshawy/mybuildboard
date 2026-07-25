import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "MyBuildBoard Backend",
    tech: "FastAPI • PostgreSQL",
    status: "Production",
  },
  {
    id: 2,
    name: "MyBuildBoard Frontend",
    tech: "React • TypeScript",
    status: "Development",
  },
  {
    id: 3,
    name: "Portfolio API",
    tech: "Cloudflare R2",
    status: "Live",
  },
];

function RecentProjects() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Projects
          </h2>

          <p className="mt-2 text-slate-500">
            Continue working on your latest projects.
          </p>
        </div>

        <Link
          to="/projects"
          className="flex items-center gap-2 font-semibold text-cyan-600 transition hover:gap-3"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex items-center justify-between rounded-3xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-100">
                <FolderOpen size={28} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {project.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {project.tech}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {project.status}
              </span>

              <p className="mt-3 text-sm text-slate-400">
                Updated recently
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentProjects;
