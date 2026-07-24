import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";
import AppButton from "@/components/ui/AppButton";

type ProjectsSectionProps = {
  projects: any[];
};

export default function ProjectsSection({
  projects,
}: ProjectsSectionProps) {
  return (
    <motion.div
      id="projects"
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
        <SectionTitle subtitle="Some of my recent work">
          Featured Projects
        </SectionTitle>

        {projects.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No projects available.
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map(
              (project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>

                  {project.technologies?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map(
                        (tech: string) => (
                          <span
                            key={tech}
                            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.github_url && (
                      <AppButton
                        variant="secondary"
                        onClick={() =>
                          window.open(
                            project.github_url,
                            "_blank",
                          )
                        }
                      >
                        <FaGithub className="mr-2" />
                        GitHub
                      </AppButton>
                    )}

                    {project.live_url && (
                      <AppButton
                        onClick={() =>
                          window.open(
                            project.live_url,
                            "_blank",
                          )
                        }
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Live Demo
                      </AppButton>
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
