type StatsCardProps = {
  title: string;
  value: string | number;
};

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-black">
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;
