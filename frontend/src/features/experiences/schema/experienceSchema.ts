import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(2).max(200),

  position: z.string().min(2).max(200),

  employment_type: z.enum([
    "full_time",
    "part_time",
    "contract",
    "freelance",
    "internship",
    "volunteer",
  ]),

  location: z.string().optional(),

  description: z.string().optional(),

  start_date: z.string(),

  end_date: z.string().optional(),

  is_current: z.boolean(),

  display_order: z.number().int().min(0),
});

export type ExperienceFormValues =
  z.infer<typeof experienceSchema>;
