import type { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import Container from "./Container";
import Section from "./Section";

type PageProps = PropsWithChildren<{
  className?: string;
}>;

export default function Page({
  children,
  className,
}: PageProps) {
  return (
    <main className={cn("min-h-screen", className)}>
      <Container>
        <Section>{children}</Section>
      </Container>
    </main>
  );
}
