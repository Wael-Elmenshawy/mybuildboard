import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";

type EducationSectionProps = {
  educations: any[];
};

export default function EducationSection({
  educations,
}: EducationSectionProps) {
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
        <SectionTitle subtitle="Academic background">
          Education
        </SectionTitle>

        {educations.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No education records available.
          </p>
        ) : (
          <div className="space-y-5">
            {educations.map((education: any) => (
              <div
                key={education.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {education.degree}
                    </h3>

                    <p className="text-blue-600 dark:text-blue-400">
                      {education.school}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {education.start_date} —{" "}
                  {education.end_date ?? "Present"}
                </p>

                {education.description && (
                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                    {education.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </AppCard>
    </motion.div>
  );
}
