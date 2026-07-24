type ProjectsSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function ProjectsSearch({
  value,
  onChange,
}: ProjectsSearchProps) {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search projects..."
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-black"
      />
    </div>
  );
}

export default ProjectsSearch;
