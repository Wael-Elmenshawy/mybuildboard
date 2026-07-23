import { apiClient } from "@/services/api/client";
import { ENDPOINTS } from "@/services/api/endpoints";

import type { CertificateFormValues } from "../schema/certificateSchema";
import type { Certificate } from "../types/certificate";

export type CreateCertificateRequest =
  CertificateFormValues;

export type UpdateCertificateRequest =
  Partial<CertificateFormValues>;

export async function getMyCertificates(): Promise<
  Certificate[]
> {
  return apiClient.get<Certificate[]>(
    ENDPOINTS.certificates.me,
  );
}

export async function createCertificate(
  payload: CreateCertificateRequest,
): Promise<Certificate> {
  return apiClient.post<Certificate>(
    ENDPOINTS.certificates.base,
    payload,
  );
}

export async function updateCertificate(
  certificateId: string,
  payload: UpdateCertificateRequest,
): Promise<Certificate> {
  return apiClient.patch<Certificate>(
    ENDPOINTS.certificates.byId(
      certificateId,
    ),
    payload,
  );
}

export async function deleteCertificate(
  certificateId: string,
): Promise<void> {
  return apiClient.delete<void>(
    ENDPOINTS.certificates.byId(
      certificateId,
    ),
  );
}
