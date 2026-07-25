import { useMemo, useState } from "react";

import { useBoards } from "@/features/boards/hooks/useBoards";

import EmptyProjects from "../components/EmptyProjects";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";
import ProjectForm from "../components/ProjectForm";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectsSearch from "../components/ProjectsSearch";
import { useProjects } from "../hooks/useProjects";
import { useDeleteProject } from "../mutations/useDeleteProject";
import type { Project } from "../types/project";

function ProjectsPage() {
  const { data: boards } = useBoards();

  const boardId = boards?.[0]?.id ?? "";

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] =
    useState<Project>();

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects(boardId);

  const deleteProject =
    useDeleteProject(boardId);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) return projects;

    return projects.filter((project) => {
      return (
        project.title
          .toLowerCase()
          .includes(keyword) ||
        (project.short_description ?? "")
          .toLowerCase()
          .includes(keyword) ||
        project.technologies.some((tech) =>
          tech
            .toLowerCase()
            .includes(keyword),
        )
      );
    });
  }, [projects, search]);

  function openCreateDialog() {
    setSelectedProject(undefined);
    setOpen(true);
  }

  function openEditDialog(
    project: Project,
  ) {
    setSelectedProject(project);
    setOpen(true);
  }

  function closeDialog() {
    setSelectedProject(undefined);
    setOpen(false);
  }

  function deleteHandler(
    project: Project,
  ) {
    if (
      confirm(
        `Delete "${project.title}"?`,
      )
    ) {
      deleteProject.mutate(project.slug);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-10">
        <ProjectsHeader
          onCreate={openCreateDialog}
        />

        <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
          Loading projects...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-10">
        <ProjectsHeader
          onCreate={openCreateDialog}
        />

        <div className="rounded-3xl border border-red-200 bg-red-50 p-16 text-center text-red-600">
          Failed to load projects.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10">
        <ProjectsHeader
          onCreate={openCreateDialog}
        />

        <ProjectsSearch
          value={search}
          onChange={setSearch}
        />

        {filteredProjects.length ===
        0 ? (
          <EmptyProjects
            onCreate={
              openCreateDialog
            }
          />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            {filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={
                    openEditDialog
                  }
                  onDelete={
                    deleteHandler
                  }
                />
              ),
            )}
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
