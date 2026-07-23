import { useState } from "react";

import CertificateDialog from "../components/CertificateDialog";
import CertificateForm from "../components/CertificateForm";
import { useCertificates } from "../hooks/useCertificates";
import { useDeleteCertificate } from "../mutations/useDeleteCertificate";
import type { Certificate } from "../types/certificate";

function CertificatesPage() {
  const {
    data: certificates = [] as Certificate[],
    isLoading,
  } = useCertificates();

  const deleteCertificate =
    useDeleteCertificate();

  const [open, setOpen] = useState(false);

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | undefined>();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Certificates
        </h1>

        <button
          onClick={() => {
            setSelectedCertificate(undefined);
            setOpen(true);
          }}
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Add Certificate
        </button>
      </div>

      <div className="space-y-4">
        {certificates.map((certificate: Certificate) => (
          <div
            key={certificate.id}
            className="rounded-xl border p-5"
          >
            <h2 className="text-xl font-semibold">
              {certificate.title}
            </h2>

            <p>{certificate.issuer}</p>

            <p className="text-sm text-gray-500">
              {certificate.issue_date}
              {certificate.expiration_date
                ? ` - ${certificate.expiration_date}`
                : ""}
            </p>

            {certificate.credential_id && (
              <p>
                Credential ID:{" "}
                {certificate.credential_id}
              </p>
            )}

            {certificate.credential_url && (
              <a
                href={certificate.credential_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Credential
              </a>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setSelectedCertificate(certificate);
                  setOpen(true);
                }}
                className="rounded border px-4 py-2"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteCertificate.mutate(
                    certificate.id,
                  )
                }
                className="rounded border border-red-500 px-4 py-2 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <CertificateDialog
        open={open}
        title={
          selectedCertificate
            ? "Edit Certificate"
            : "Add Certificate"
        }
        onClose={() => {
          setOpen(false);
          setSelectedCertificate(undefined);
        }}
      >
        <CertificateForm
          certificate={selectedCertificate}
          onSuccess={() => {
            setOpen(false);
            setSelectedCertificate(undefined);
          }}
        />
      </CertificateDialog>
    </div>
  );
}

export default CertificatesPage;
