export interface Board {
  id: string;
  owner_id: string;

  title: string;
  slug: string;

  description: string | null;

  visibility: string;

  status: string;

  is_featured: boolean;
}
