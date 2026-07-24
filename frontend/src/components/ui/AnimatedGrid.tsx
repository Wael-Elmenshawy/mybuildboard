import type { ReactNode } from "react";

type AnimatedGridProps = {
  children: ReactNode;
};

export default function AnimatedGrid({
  children,
}: AnimatedGridProps) {
  return (
    <div className="relative">
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          dark:opacity-20
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / .15) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / .15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
