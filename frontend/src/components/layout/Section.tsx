import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export default function Section({
  children,
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        className
      )}
    >
      {children}
    </section>
  );
}
