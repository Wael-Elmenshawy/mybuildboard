type ExperienceSectionProps = {
  experiences: any[];
};

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Experience
      </h2>

      {experiences.length === 0 ? (
        <p className="text-slate-500">
          No experience added yet.
        </p>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience: any) => (
            <div
              key={experience.id}
              className="border-b pb-6 last:border-0 last:pb-0"
            >
              <h3 className="text-xl font-semibold">
                {experience.position}
              </h3>

              <p className="text-blue-600">
                {experience.company}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {experience.start_date} —{" "}
                {experience.end_date ?? "Present"}
              </p>

              <p className="mt-3 text-slate-600">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
