import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string().min(2).max(200),

  degree: z.string().min(2).max(200),

  field_of_study: z.string().optional(),

  start_date: z.string(),

  end_date: z.string().optional(),

  grade: z.string().optional(),

  description: z.string().optional(),

  is_current: z.boolean(),

  display_order: z.number().int().min(0),
});

export type EducationFormValues =
  z.infer<typeof educationSchema>;
