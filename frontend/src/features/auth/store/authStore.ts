import { create } from "zustand";

import type { AuthUser } from "../types";

const ACCESS_TOKEN_KEY = "access_token";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),

  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN_KEY),

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    set({
      accessToken: token,
      isAuthenticated: !!token,
    });
  },

  setUser: (user) =>
    set({
      user,
    }),

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
