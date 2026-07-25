import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import CertificateDialog from "../components/CertificateDialog";
import CertificateForm from "../components/CertificateForm";
import { useCertificates } from "../hooks/useCertificates";
import { useDeleteCertificate } from "../mutations/useDeleteCertificate";
import type { Certificate } from "../types/certificate";

function CertificatesPage() {
  const [open, setOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate>();

  const deleteCertificate = useDeleteCertificate();

  const {
    data: certificates,
    isLoading,
    isError,
  } = useCertificates();

  const openCreateDialog = () => {
    setSelectedCertificate(undefined);
    setOpen(true);
  };

  const openEditDialog = (
    certificate: Certificate,
  ) => {
    setSelectedCertificate(certificate);
    setOpen(true);
  };

  const closeDialog = () => {
    setSelectedCertificate(undefined);
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Certificates
        </h1>

        <p className="mt-4">
          Loading certificates...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Certificates
        </h1>

        <p className="mt-4 text-red-500">
          Failed to load certificates.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Certificates
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your professional certificates.
            </p>
          </div>

          <Button
            onClick={openCreateDialog}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Certificate
          </Button>
        </div>

        {!certificates || certificates.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-2xl font-semibold">
              No certificates yet
            </h2>

            <div className="mt-6">
              <Button onClick={openCreateDialog}>
                Create Certificate
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {certificate.title}
                    </h2>

                    <p className="text-gray-600">
                      {certificate.issuer}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {certificate.issue_date}
                      {certificate.expiration_date
                        ? ` - ${certificate.expiration_date}`
                        : ""}
                    </p>

                    {certificate.credential_id && (
                      <p className="mt-2 text-sm">
                        Credential ID:{" "}
                        {certificate.credential_id}
                      </p>
                    )}

                    {certificate.credential_url && (
                      <a
                        href={certificate.credential_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block text-blue-600 underline"
                      >
                        View Credential
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEditDialog(
                          certificate,
                        )
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          confirm(
                            `Delete "${certificate.title}"?`,
                          )
                        ) {
                          deleteCertificate.mutate(
                            certificate.id,
                          );
                        }
                      }}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <CertificateDialog
        open={open}
        title={
          selectedCertificate
            ? "Edit Certificate"
            : "Add Certificate"
        }
        onClose={closeDialog}
      >
        <CertificateForm
          certificate={selectedCertificate}
          onSuccess={closeDialog}
        />
      </CertificateDialog>
    </>
  );
}

export default CertificatesPage;
