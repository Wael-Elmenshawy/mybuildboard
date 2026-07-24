import { Plus } from "lucide-react";

type ProjectsHeaderProps = {
  onCreate: () => void;
};

function ProjectsHeader({
  onCreate,
}: ProjectsHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Projects
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all your portfolio projects from one place.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        <Plus size={18} />
        New Project
      </button>
    </div>
  );
}

export default ProjectsHeader;
