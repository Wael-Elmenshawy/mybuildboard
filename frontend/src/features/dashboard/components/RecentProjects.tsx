import { FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Recent Projects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest projects.
          </p>
        </div>

        <Link
          to="/projects"
          className="text-sm font-semibold text-cyan-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-cyan-500 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
                <FolderOpen
                  size={22}
                  className="text-cyan-600"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  {project.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {project.tech}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentProjects;
