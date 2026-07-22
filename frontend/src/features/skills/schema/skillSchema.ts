import { z } from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    .min(2, "Skill name must be at least 2 characters.")
    .max(100, "Skill name must not exceed 100 characters."),

  level: z.enum([
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ]),

  display_order: z
    .number()
    .int()
    .min(0),
});

export type SkillFormValues = z.infer<
  typeof skillSchema
>;
