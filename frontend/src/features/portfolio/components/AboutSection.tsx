type AboutSectionProps = {
  profile: any;
};

export default function AboutSection({
  profile,
}: AboutSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        About Me
      </h2>

      <p className="leading-8 text-slate-600">
        {profile?.bio ??
          "No biography has been added yet."}
      </p>
    </section>
  );
}
