import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";

type ExperienceSectionProps = {
  experiences: any[];
};

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <motion.div
      id="experience"
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
        <SectionTitle subtitle="My professional journey">
          Experience
        </SectionTitle>

        {experiences.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No experience available.
          </p>
        ) : (
          <div className="relative border-l-2 border-blue-200 pl-8 dark:border-slate-700">
            {experiences.map(
              (experience: any, index: number) => (
                <motion.div
                  key={experience.id}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                  className="relative mb-10 last:mb-0"
                >
                  <div className="absolute -left-[46px] flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                    <FaBriefcase />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {experience.position}
                    </h3>

                    <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                      {experience.company}
                    </p>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {experience.start_date} —{" "}
                      {experience.end_date ?? "Present"}
                    </p>

                    {experience.description && (
                      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                        {experience.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        )}
      </AppCard>
    </motion.div>
  );
}
