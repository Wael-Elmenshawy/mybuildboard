export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "freelance"
  | "internship"
  | "volunteer";

export interface Experience {
  id: string;
  user_id: string;

  company: string;
  position: string;

  employment_type: EmploymentType;

  location: string | null;
  description: string | null;

  start_date: string;
  end_date: string | null;

  is_current: boolean;

  display_order: number;
}
