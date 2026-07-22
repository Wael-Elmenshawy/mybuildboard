import AppRouter from "@/routes";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Global Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Primary Glow */}
        <div className="absolute left-[-200px] top-[-150px] h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

        {/* Blue Glow */}
        <div className="absolute right-[-250px] top-[200px] h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-3xl" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03]" />
      </div>

      <AppRouter />
    </div>
  );
}

export default App;
