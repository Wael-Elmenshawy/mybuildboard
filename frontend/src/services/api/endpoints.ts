export const ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
  },

  dashboard: {
    summary: "/api/v1/dashboard",
  },

  education: {
    base: "/api/v1/education",
    me: "/api/v1/education/me",
    byId: (educationId: string) =>
      `/api/v1/education/${educationId}`,
  },

  certificates: {
    base: "/api/v1/certificates",
    me: "/api/v1/certificates/me",
    byId: (certificateId: string) =>
      `/api/v1/certificates/${certificateId}`,
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

  skills: {
    base: "/api/v1/skills",

    me: "/api/v1/skills/me",

    byId: (skillId: string) =>
      `/api/v1/skills/${skillId}`,
  },

  socialLinks: {
    base: "/api/v1/social-links",

    me: "/api/v1/social-links/me",
  },

  experiences: {
    base: "/api/v1/experiences",

    me: "/api/v1/experiences/me",

    byId: (experienceId: string) =>
      `/api/v1/experiences/${experienceId}`,
  },
};
