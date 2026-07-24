import type { ReactNode } from "react";
import { motion } from "framer-motion";

type AppCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AppCard({
  children,
  className = "",
}: AppCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        rounded-3xl
        border
        border-slate-200/70
        bg-white/70
        p-6
        shadow-lg
        backdrop-blur-xl
        transition-all
        dark:border-slate-700
        dark:bg-slate-900/70
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
