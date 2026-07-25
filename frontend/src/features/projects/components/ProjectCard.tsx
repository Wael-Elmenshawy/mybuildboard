import {
  ExternalLink,
  Pencil,
  Sparkles,
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
    <Card className="group overflow-hidden rounded-3xl border border-slate-200 p-0 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl">
      <div className="h-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-700" />

      <div className="space-y-6 p-7">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-2xl font-bold text-slate-900">
                {project.title}
              </h3>

              {Boolean(
                (project as Project & { featured?: boolean }).featured
              ) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Star
                    size={14}
                    className="fill-amber-500 text-amber-500"
                  />
                  Featured
                </span>
              )}
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
              {project.description}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="rounded-xl p-3 text-sky-600 transition hover:bg-sky-50"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(project)}
              className="rounded-xl p-3 text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition group-hover:bg-cyan-50 group-hover:text-cyan-700"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <div className="flex gap-4">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
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
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>

          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
              project.status === "published"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <Sparkles size={12} />
            {project.status}
          </span>
        </div>
      </div>
    </Card>
  );
}
