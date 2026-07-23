type SkillsSectionProps = {
  skills: any[];
};

export default function SkillsSection({
  skills,
}: SkillsSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-slate-500">
          No skills added yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill: any) => (
            <span
              key={skill.id}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
