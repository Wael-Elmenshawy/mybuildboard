import {
  Award,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LucideIcon,
  Sparkles,
} from "lucide-react";

export type DashboardCardKey =
  | "projects"
  | "skills"
  | "experiences"
  | "educations"
  | "certificates";

export interface DashboardCardConfig {
  key: DashboardCardKey;
  title: string;
  icon: LucideIcon;
  iconClassName: string;
}

export const dashboardCards: DashboardCardConfig[] = [
  {
    key: "projects",
    title: "Projects",
    icon: FolderKanban,
    iconClassName: "text-blue-600",
  },
  {
    key: "skills",
    title: "Skills",
    icon: Sparkles,
    iconClassName: "text-purple-600",
  },
  {
    key: "experiences",
    title: "Experience",
    icon: Briefcase,
    iconClassName: "text-orange-600",
  },
  {
    key: "educations",
    title: "Education",
    icon: GraduationCap,
    iconClassName: "text-green-600",
  },
  {
    key: "certificates",
    title: "Certificates",
    icon: Award,
    iconClassName: "text-amber-600",
  },
];
