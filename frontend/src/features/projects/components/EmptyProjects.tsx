import { FolderOpen, Plus } from "lucide-react";

type EmptyProjectsProps = {
  onCreate: () => void;
};

function EmptyProjects({
  onCreate,
}: EmptyProjectsProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-8 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <FolderOpen
          size={40}
          className="text-slate-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No projects yet
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Start building your portfolio by creating your first
        project. It will appear on your public profile and
        dashboard.
      </p>

      <button
        onClick={onCreate}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        <Plus size={18} />
        Create Project
      </button>
    </div>
  );
}

export default EmptyProjects;
