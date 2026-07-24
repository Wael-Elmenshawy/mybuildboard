import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface AppPageProps {
  children: ReactNode;
  className?: string;
}

export default function AppPage({
  children,
  className,
}: AppPageProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-slate-50",
        className
      )}
    >
      {children}
    </main>
  );
}
