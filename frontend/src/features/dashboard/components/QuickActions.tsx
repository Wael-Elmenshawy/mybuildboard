const actions = [
  {
    title: "Add Project",
    description: "Create a new portfolio project.",
  },
  {
    title: "Update Profile",
    description: "Keep your profile information up to date.",
  },
  {
    title: "Import GitHub",
    description: "Sync your repositories automatically.",
  },
];

function QuickActions() {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="w-full rounded-2xl border border-border p-4 text-left transition hover:bg-accent"
          >
            <h3 className="font-semibold">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
