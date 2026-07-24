import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

import AppCard from "@/components/ui/AppCard";
import SectionTitle from "@/components/ui/SectionTitle";
import AppButton from "@/components/ui/AppButton";

type CertificatesSectionProps = {
  certificates: any[];
};

export default function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
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
        <SectionTitle subtitle="Professional certifications">
          Certificates
        </SectionTitle>

        {certificates.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No certificates available.
          </p>
        ) : (
          <div className="space-y-5">
            {certificates.map((certificate: any) => (
              <div
                key={certificate.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                      <FaCertificate />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {certificate.name}
                      </h3>

                      <p className="mt-1 text-blue-600 dark:text-blue-400">
                        {certificate.issuer}
                      </p>

                      {certificate.issue_date && (
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          Issued: {certificate.issue_date}
                        </p>
                      )}
                    </div>
                  </div>

                  {certificate.credential_url && (
                    <AppButton
                      variant="outline"
                      onClick={() =>
                        window.open(
                          certificate.credential_url,
                          "_blank",
                        )
                      }
                    >
                      View
                    </AppButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </AppCard>
    </motion.div>
  );
}
