import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { useBoards } from "@/features/boards/hooks/useBoards";

import ProjectDialog from "../components/ProjectDialog";
import ProjectForm from "../components/ProjectForm";
import { useProjects } from "../hooks/useProjects";
import { useDeleteProject } from "../mutations/useDeleteProject";
import type { Project } from "../types/project";

function ProjectsPage() {
  const { data: boards } = useBoards();

  const boardId = boards?.[0]?.id ?? "";

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<Project>();

  const deleteProject = useDeleteProject(boardId);

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects(boardId);

  const openCreateDialog = () => {
    setSelectedProject(undefined);
    setOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedProject(undefined);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <p className="mt-4">
          Loading projects...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <p className="mt-4 text-red-500">
          Failed to load projects.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all your portfolio projects.
            </p>
          </div>

          <button
            onClick={openCreateDialog}
            className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>

        {!projects || projects.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No projects yet
            </h2>

            <button
              onClick={openCreateDialog}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold">
                    {project.title}
                  </h2>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        openEditDialog(project)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Delete "${project.title}"?`,
                          )
                        ) {
                          deleteProject.mutate(
                            project.slug,
                          );
                        }
                      }}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">
                  {project.short_description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProjectDialog
        open={open}
        title={
          selectedProject
            ? "Edit Project"
            : "Create Project"
        }
        onClose={closeDialog}
      >
        <ProjectForm
          boardId={boardId}
          project={selectedProject}
          onSuccess={closeDialog}
        />
      </ProjectDialog>
    </>
  );
}

export default ProjectsPage;
