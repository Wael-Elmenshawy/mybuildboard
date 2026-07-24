import { motion } from "framer-motion";

import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";

type SkillsSectionProps = {
  skills: any[];
};

export default function SkillsSection({
  skills,
}: SkillsSectionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <AppCard>
        <SectionTitle subtitle="Technologies and tools">
          Skills
        </SectionTitle>

        {skills.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No skills added yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: any) => (
              <motion.span
                key={skill.id}
                whileHover={{
                  scale: 1.08,
                }}
                className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition dark:bg-blue-900/40 dark:text-blue-300"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        )}
      </AppCard>
    </motion.div>
  );
}
