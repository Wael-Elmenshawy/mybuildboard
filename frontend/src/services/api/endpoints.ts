export const ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
  },

  users: {
    me: "/api/v1/users/me",
  },

  boards: {
    base: "/api/v1/boards",
  },

  projects: {
    base: "/api/v1/projects",

    byBoard: (boardId: string) =>
      `/api/v1/projects/board/${boardId}`,

    bySlug: (slug: string) =>
      `/api/v1/projects/${slug}`,

    importFromGithub:
      "/api/v1/projects/import-from-github",
  },

  socialLinks: {
    base: "/api/v1/social-links",

    me: "/api/v1/social-links/me",
  },
} as const;
