export type SkillLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

export interface Skill {
  id: string;

  user_id: string;

  name: string;

  level: SkillLevel;

  display_order: number;
}
