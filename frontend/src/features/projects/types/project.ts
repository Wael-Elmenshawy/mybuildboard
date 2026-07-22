export interface Project {
  id: string;
  board_id: string;

  title: string;
  slug: string;

  short_description: string | null;
  description: string | null;

  github_url: string |null;
  live_url: string | null;

  video_url: string | null;
  thumbnail_url: string | null;

  technologies: string[];

  display_order: number;

  is_featured: boolean;

  visibility: "public" | "private";

  status: "published" | "draft";

  is_imported_from_github: boolean;

  source_github_repo_id: string | null;
}
