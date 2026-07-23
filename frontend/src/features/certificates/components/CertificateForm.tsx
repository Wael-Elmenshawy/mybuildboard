import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Certificate } from "../types/certificate";
import { useCreateCertificate } from "../mutations/useCreateCertificate";
import { useUpdateCertificate } from "../mutations/useUpdateCertificate";

type CertificateFormValues = {
  title: string;
  issuer: string;
  issue_date: string;
  expiration_date: string;
  credential_id: string;
  credential_url: string;
  display_order: number;
};

type CertificateFormProps = {
  certificate?: Certificate;
  onSuccess?: () => void;
};

function CertificateForm({
  certificate,
  onSuccess,
}: CertificateFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CertificateFormValues>();

  const createCertificate =
    useCreateCertificate();

  const updateCertificate =
    useUpdateCertificate();

  useEffect(() => {
    if (certificate) {
      reset({
        title: certificate.title,
        issuer: certificate.issuer,
        issue_date: certificate.issue_date,
        expiration_date:
          certificate.expiration_date ?? "",
        credential_id:
          certificate.credential_id ?? "",
        credential_url:
          certificate.credential_url ?? "",
        display_order:
          certificate.display_order,
      });
    } else {
      reset({
        title: "",
        issuer: "",
        issue_date: "",
        expiration_date: "",
        credential_id: "",
        credential_url: "",
        display_order: 0,
      });
    }
  }, [certificate, reset]);

  const onSubmit = async (
    data: CertificateFormValues,
  ) => {
    const payload = {
      ...data,
      expiration_date:
        data.expiration_date || undefined,
      credential_id:
        data.credential_id || undefined,
      credential_url:
        data.credential_url || undefined,
    };

    if (certificate) {
      await updateCertificate.mutateAsync({
        certificateId: certificate.id,
        payload,
      });
    } else {
      await createCertificate.mutateAsync(
        payload,
      );
    }

    reset();

    onSuccess?.();
  };

  const loading =
    createCertificate.isPending ||
    updateCertificate.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          {...register("title")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Issuer
        </label>

        <input
          {...register("issuer")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block font-medium">
            Issue Date
          </label>

          <input
            type="date"
            {...register("issue_date")}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Expiration Date
          </label>

          <input
            type="date"
            {...register("expiration_date")}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Credential ID
        </label>

        <input
          {...register("credential_id")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Credential URL
        </label>

        <input
          {...register("credential_url")}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Display Order
        </label>

        <input
          type="number"
          {...register("display_order", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : certificate
              ? "Update Certificate"
              : "Save Certificate"}
        </button>
      </div>
    </form>
  );
}

export default CertificateForm;
