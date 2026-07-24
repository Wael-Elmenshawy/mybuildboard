import type { ReactNode } from "react";

type AuroraBackgroundProps = {
  children: ReactNode;
};

export default function AuroraBackground({
  children,
}: AuroraBackgroundProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-200px] top-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute right-[-200px] top-[150px] h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute bottom-[-180px] left-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
