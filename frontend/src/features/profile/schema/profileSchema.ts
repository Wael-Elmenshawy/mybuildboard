import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .max(255)
    .nullable()
    .optional(),

  headline: z
    .string()
    .max(255)
    .nullable()
    .optional(),

  bio: z
    .string()
    .max(5000)
    .nullable()
    .optional(),

  cover_url: z
    .string()
    .url()
    .nullable()
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .url()
    .nullable()
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .max(100)
    .nullable()
    .optional(),

  city: z
    .string()
    .max(100)
    .nullable()
    .optional(),

  timezone: z
    .string()
    .max(100)
    .nullable()
    .optional(),

  is_public: z.boolean(),
});

export type ProfileFormValues =
  z.infer<typeof profileSchema>;
