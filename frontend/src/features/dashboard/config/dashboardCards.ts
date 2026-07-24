import {
  Award,
  Briefcase,
  FolderKanban,
  GraduationCap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type DashboardCard = {
  key:
    | "projects"
    | "skills"
    | "experiences"
    | "educations"
    | "certificates";
  title: string;
  icon: LucideIcon;
  iconClassName: string;
};

export const dashboardCards: DashboardCard[] = [
  {
    key: "projects",
    title: "Projects",
    icon: FolderKanban,
    iconClassName: "text-cyan-600",
  },
  {
    key: "skills",
    title: "Skills",
    icon: Award,
    iconClassName: "text-violet-600",
  },
  {
    key: "experiences",
    title: "Experience",
    icon: Briefcase,
    iconClassName: "text-emerald-600",
  },
  {
    key: "educations",
    title: "Education",
    icon: GraduationCap,
    iconClassName: "text-orange-600",
  },
  {
    key: "certificates",
    title: "Certificates",
    icon: Award,
    iconClassName: "text-rose-600",
  },
];
