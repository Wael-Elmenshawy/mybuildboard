type StatsSectionProps = {
  projects: any[];
  skills: any[];
  experiences: any[];
  certificates: any[];
};

export default function StatsSection({
  projects,
  skills,
  experiences,
  certificates,
}: StatsSectionProps) {
  const stats = [
    {
      label: "Projects",
      value: projects.length,
    },
    {
      label: "Skills",
      value: skills.length,
    },
    {
      label: "Experience",
      value: experiences.length,
    },
    {
      label: "Certificates",
      value: certificates.length,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border bg-white p-6 text-center shadow-sm"
        >
          <div className="text-4xl font-bold text-blue-600">
            {stat.value}
          </div>

          <div className="mt-2 text-slate-500">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
