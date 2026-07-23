import { FolderKanban } from "lucide-react";

import Card from "@/components/ui/Card";

interface RecentProject {
  id: string;
  title: string;
  updated_at: string;
}

interface RecentProjectsCardProps {
  projects: RecentProject[];
}

const RecentProjectsCard = ({
  projects,
}: RecentProjectsCardProps) => {
  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FolderKanban size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Projects
          </h2>

          <p className="text-sm text-gray-500">
            Your latest updated projects.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
          <p className="font-medium text-gray-700">
            No projects yet
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Create your first project to showcase your work.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="rounded-xl border border-gray-100 p-4 transition-colors duration-200 hover:bg-gray-50"
            >
              <div className="font-semibold text-gray-900">
                {project.title}
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Updated{" "}
                {new Date(
                  project.updated_at,
                ).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default RecentProjectsCard;
