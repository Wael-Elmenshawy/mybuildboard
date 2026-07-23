type EducationSectionProps = {
  educations: any[];
};

export default function EducationSection({
  educations,
}: EducationSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Education
      </h2>

      {educations.length === 0 ? (
        <p className="text-slate-500">
          No education added yet.
        </p>
      ) : (
        <div className="space-y-6">
          {educations.map((education: any) => (
            <div
              key={education.id}
              className="border-b pb-6 last:border-0 last:pb-0"
            >
              <h3 className="text-xl font-semibold">
                {education.degree}
              </h3>

              <p className="text-blue-600">
                {education.school}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {education.start_date} —{" "}
                {education.end_date ?? "Present"}
              </p>

              {education.description && (
                <p className="mt-3 text-slate-600">
                  {education.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
