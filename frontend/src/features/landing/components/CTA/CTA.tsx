function CTA() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <button className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        🚀 Build My Board
      </button>

      <button className="rounded-xl border border-border bg-background px-8 py-4 text-base font-semibold transition-all duration-300 hover:bg-muted">
        ▶ Live Demo
      </button>
    </div>
  );
}

export default CTA;
