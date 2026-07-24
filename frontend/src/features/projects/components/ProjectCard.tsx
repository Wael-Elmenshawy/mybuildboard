import {
  ExternalLink,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import Card from "@/components/ui/Card";
import type { Project } from "@/features/projects/types/project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              {Boolean(
                (project as Project & { featured?: boolean }).featured
              ) && (
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              )}
            </div>

            <p className="mt-2 text-sm text-slate-600">
              {project.description}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(project)}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-black"
              >
                <FaGithub size={18} />
                GitHub
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-black"
              >
                <ExternalLink size={18} />
                Live
              </a>
            )}
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              project.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>
    </Card>
  );
}
