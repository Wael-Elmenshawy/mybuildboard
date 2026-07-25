import { Search } from "lucide-react";

type ProjectsSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function ProjectsSearch({
  value,
  onChange,
}: ProjectsSearchProps) {
  return (
    <div className="mb-10">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="Search projects, technologies, descriptions..."
          className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-base shadow-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
        />
      </div>
    </div>
  );
}

export default ProjectsSearch;
