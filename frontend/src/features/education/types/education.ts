export interface Education {
  id: string;
  user_id: string;

  institution: string;
  degree: string;
  field_of_study: string | null;

  start_date: string;
  end_date: string | null;

  grade: string | null;
  description: string | null;

  is_current: boolean;

  display_order: number;
}
