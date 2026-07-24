import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/utils/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

interface AppButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan-600 text-white hover:bg-cyan-700",

  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",

  outline:
    "border border-slate-300 bg-white hover:bg-slate-50",

  ghost:
    "hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

export default function AppButton({
  children,
  className,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
