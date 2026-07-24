export default function WelcomeHero() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">
        Welcome back 👋
      </h1>

      <p className="text-slate-500 dark:text-slate-400">
        Here's an overview of your developer workspace.
      </p>

      <p className="text-sm text-cyan-500">
        {today}
      </p>
    </section>
  );
}
