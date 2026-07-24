import { motion } from "framer-motion";

import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";

type AboutSectionProps = {
  profile: any;
};

export default function AboutSection({
  profile,
}: AboutSectionProps) {
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
      id="about"
    >
      <AppCard>
        <SectionTitle subtitle="A quick introduction about me">
          About Me
        </SectionTitle>

        <p className="leading-8 text-slate-600 dark:text-slate-300">
          {profile?.bio ??
            "No biography has been added yet."}
        </p>
      </AppCard>
    </motion.div>
  );
}
