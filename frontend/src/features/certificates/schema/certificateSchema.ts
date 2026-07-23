import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issue_date: z.string().min(1),
  expiration_date: z.string().optional(),
  credential_id: z.string().optional(),
  credential_url: z.string().optional(),
  display_order: z.number().default(0),
});

export type CertificateFormValues =
  z.infer<typeof certificateSchema>;
