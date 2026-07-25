import { FolderOpen, Plus } from "lucide-react";

type EmptyProjectsProps = {
  onCreate: () => void;
};

function EmptyProjects({
  onCreate,
}: EmptyProjectsProps) {
  return (
    <section className="rounded-[32px] border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-50">
        <FolderOpen
          size={46}
          className="text-cyan-600"
        />
      </div>

      <h2 className="mt-8 text-3xl font-black text-slate-900">
        Your portfolio is waiting.
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-500">
        Create your first project and start building a portfolio
        that recruiters and companies can explore.
      </p>

      <button
        onClick={onCreate}
        className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105"
      >
        <Plus size={20} />
        Create First Project
      </button>
    </section>
  );
}

export default EmptyProjects;
