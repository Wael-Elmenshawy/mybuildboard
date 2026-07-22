const activities = [
  {
    id: 1,
    title: "Updated Profile",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Added a new Project",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Uploaded Certificate",
    time: "3 days ago",
  },
];

function RecentActivity() {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-border pb-4 last:border-none last:pb-0"
          >
            <div>
              <p className="font-medium">
                {activity.title}
              </p>

              <p className="text-sm text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivity;
