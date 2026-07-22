import { create } from "zustand";

interface LayoutState {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  collapseSidebar: () => void;
  expandSidebar: () => void;
  toggleCollapse: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: false,
  isSidebarCollapsed: false,

  openSidebar: () =>
    set({
      isSidebarOpen: true,
    }),

  closeSidebar: () =>
    set({
      isSidebarOpen: false,
    }),

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  collapseSidebar: () =>
    set({
      isSidebarCollapsed: true,
    }),

  expandSidebar: () =>
    set({
      isSidebarCollapsed: false,
    }),

  toggleCollapse: () =>
    set((state) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    })),
}));
