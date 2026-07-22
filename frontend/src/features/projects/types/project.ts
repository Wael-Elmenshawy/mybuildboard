export interface Project {
  id: string;
  board_id: string;

  title: string;
  slug: string;

  short_description: string | null;

  github_url: string | null;

  technologies: string[];

  is_imported_from_github: boolean;

  source_github_repo_id: string | null;
}
