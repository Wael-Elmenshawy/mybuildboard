import { useBoards } from "@/features/boards/hooks/useBoards";

import { useProjects } from "../hooks/useProjects";

function ProjectsPage() {
  const { data: boards } = useBoards();

  const boardId = boards?.[0]?.id ?? "";

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects(boardId);

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (isError) {
    return <div>Failed to load projects.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Projects
      </h1>

      <pre>
        {JSON.stringify(projects, null, 2)}
      </pre>
    </div>
  );
}

export default ProjectsPage;
