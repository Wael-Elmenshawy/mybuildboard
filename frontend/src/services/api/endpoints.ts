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
  },
} as const;
