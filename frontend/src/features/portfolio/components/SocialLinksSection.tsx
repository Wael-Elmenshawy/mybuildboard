import type { ReactNode } from "react";

import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";

import AppButton from "@/components/ui/AppButton";
import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";

type SocialLinksSectionProps = {
  socialLinks: any[];
};

const icons: Record<string, ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  website: <FaGlobe />,
};

export default function SocialLinksSection({
  socialLinks,
}: SocialLinksSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <AppCard>
        <SectionTitle subtitle="Connect with me">
          Social Links
        </SectionTitle>

        {socialLinks.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No social links available.
          </p>
        ) : (
          <div className="space-y-4">
            {socialLinks.map((link: any) => (
              <div
                key={link.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                    {icons[link.platform?.toLowerCase()] ?? (
                      <FaGlobe />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold capitalize text-slate-900 dark:text-white">
                      {link.platform}
                    </p>

                    <p className="text-sm text-slate-500">
                      {link.url}
                    </p>
                  </div>
                </div>

                <AppButton
                  variant="outline"
                  onClick={() =>
                    window.open(link.url, "_blank")
                  }
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Open
                </AppButton>
              </div>
            ))}
          </div>
        )}
      </AppCard>
    </motion.div>
  );
}
