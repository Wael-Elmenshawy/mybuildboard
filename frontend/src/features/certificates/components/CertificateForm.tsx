import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import {
  certificateSchema,
  type CertificateFormValues,
} from "../schema/certificateSchema";

import type { Certificate } from "../types/certificate";

import { useCreateCertificate } from "../mutations/useCreateCertificate";
import { useUpdateCertificate } from "../mutations/useUpdateCertificate";

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
    certificateSchema.parse(data);

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
      <Input
        label="Title"
        {...register("title")}
      />

      <Input
        label="Issuer"
        {...register("issuer")}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="Issue Date"
          {...register("issue_date")}
        />

        <Input
          type="date"
          label="Expiration Date"
          {...register("expiration_date")}
        />
      </div>

      <Input
        label="Credential ID"
        {...register("credential_id")}
      />

      <Input
        label="Credential URL"
        {...register("credential_url")}
      />

      <Input
        type="number"
        label="Display Order"
        {...register("display_order", {
          valueAsNumber: true,
        })}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : certificate
              ? "Update Certificate"
              : "Save Certificate"}
        </Button>
      </div>
    </form>
  );
}

export default CertificateForm;
