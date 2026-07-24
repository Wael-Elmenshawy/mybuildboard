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
    if (!projects) {
      return [];
    }

    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) {
      return projects;
    }

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
      <div className="mx-auto max-w-7xl p-8">
        <ProjectsHeader
          onCreate={openCreateDialog}
        />

        <p>Loading projects...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-8">
        <ProjectsHeader
          onCreate={openCreateDialog}
        />

        <p className="text-red-500">
          Failed to load projects.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl p-8">
        <ProjectsHeader
          onCreate={openCreateDialog}
        />

        <ProjectsSearch
          value={search}
          onChange={setSearch}
        />

        {filteredProjects.length === 0 ? (
          <EmptyProjects
            onCreate={openCreateDialog}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
