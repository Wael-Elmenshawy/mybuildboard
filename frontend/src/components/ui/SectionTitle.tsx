import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  subtitle?: string;
  className?: string;
};

export default function SectionTitle({
  children,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
      }}
      className={`mb-8 ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {children}
      </h2>

      {subtitle && (
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}

      <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
    </motion.div>
  );
}
