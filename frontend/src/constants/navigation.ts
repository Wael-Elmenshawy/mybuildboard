export interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "profile",
    label: "Profile",
    path: "/profile",
  },
  {
    id: "projects",
    label: "Projects",
    path: "/projects",
  },
  {
    id: "boards",
    label: "Boards",
    path: "/boards",
  },
  {
    id: "github",
    label: "GitHub",
    path: "/github",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    path: "/portfolio",
  },
];
