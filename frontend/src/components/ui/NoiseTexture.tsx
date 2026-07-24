import type { ReactNode } from "react";

type NoiseTextureProps = {
  children: ReactNode;
};

export default function NoiseTexture({
  children,
}: NoiseTextureProps) {
  return (
    <div className="relative">
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.03]
          dark:opacity-[0.06]
          mix-blend-overlay
        "
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,.35) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,.25) 1px, transparent 1px)
          `,
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
