type ProjectsFiltersProps = {
  status: "all" | "published" | "draft";
  onStatusChange: (
    value: "all" | "published" | "draft",
  ) => void;
};

function ProjectsFilters({
  status,
  onStatusChange,
}: ProjectsFiltersProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <button
        onClick={() => onStatusChange("all")}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          status === "all"
            ? "bg-black text-white"
            : "border border-gray-300 bg-white"
        }`}
      >
        All
      </button>

      <button
        onClick={() =>
          onStatusChange("published")
        }
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          status === "published"
            ? "bg-green-600 text-white"
            : "border border-gray-300 bg-white"
        }`}
      >
        Published
      </button>

      <button
        onClick={() =>
          onStatusChange("draft")
        }
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          status === "draft"
            ? "bg-yellow-500 text-white"
            : "border border-gray-300 bg-white"
        }`}
      >
        Draft
      </button>
    </div>
  );
}

export default ProjectsFilters;
