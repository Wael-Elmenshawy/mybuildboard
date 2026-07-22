import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters."),

  shortDescription: z
    .string()
    .min(10, "Description is too short."),

  githubUrl: z
    .string()
    .url("Invalid GitHub URL.")
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .url("Invalid Live URL.")
    .optional()
    .or(z.literal("")),
});

export type ProjectFormValues = z.infer<
  typeof projectSchema
>;
