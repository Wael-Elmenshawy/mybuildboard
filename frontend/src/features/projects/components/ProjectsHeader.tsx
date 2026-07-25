import {
  FolderKanban,
  Plus,
  Sparkles,
} from "lucide-react";

type ProjectsHeaderProps = {
  onCreate: () => void;
};

function ProjectsHeader({
  onCreate,
}: ProjectsHeaderProps) {
  return (
    <section className="mb-10 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
          <Sparkles size={16} />
          Portfolio Management
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Projects
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
          Create beautiful portfolio projects, organize technologies,
          and keep your public profile polished and up to date.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus size={18} />
          New Project
        </button>

        <button
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FolderKanban size={18} />
          Portfolio
        </button>
      </div>
    </section>
  );
}

export default ProjectsHeader;
