import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

type MouseGlowProps = {
  children: ReactNode;
};

export default function MouseGlow({
  children,
}: MouseGlowProps) {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const x = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX - 300);
      mouseY.set(event.clientY - 300);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="
          pointer-events-none
          fixed
          top-0
          left-0
          z-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-400/10
          blur-3xl
          dark:bg-cyan-500/10
        "
        style={{
          x,
          y,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
