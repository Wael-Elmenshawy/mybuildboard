export interface SmartHubItem {
  id: string;
  label: string;
  category: "social" | "cloud" | "dev" | "tools";
}

export const smartHubItems: SmartHubItem[] = [
  {
    id: "github",
    label: "GitHub",
    category: "social",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    category: "social",
  },
  {
    id: "resume",
    label: "Resume",
    category: "tools",
  },
  {
    id: "docker",
    label: "Docker",
    category: "dev",
  },
  {
    id: "aws",
    label: "AWS",
    category: "cloud",
  },
  {
    id: "azure",
    label: "Azure",
    category: "cloud",
  },
  {
    id: "gcp",
    label: "Google Cloud",
    category: "cloud",
  },
  {
    id: "terraform",
    label: "Terraform",
    category: "dev",
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    category: "dev",
  },
  {
    id: "figma",
    label: "Figma",
    category: "tools",
  },
  {
    id: "jira",
    label: "Jira",
    category: "tools",
  },
];
