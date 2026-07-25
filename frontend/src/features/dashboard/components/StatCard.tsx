import type { LucideIcon } from "lucide-react";

import Card from "@/components/ui/Card";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClassName,
}: StatCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl">
      <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-cyan-50 transition group-hover:bg-cyan-100" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h3 className="mt-4 text-4xl font-black text-slate-900">
            {value}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Total available
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-50 ${iconClassName}`}
        >
          <Icon size={26} strokeWidth={2.2} />
        </div>
      </div>

      <div className="relative mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
      </div>
    </Card>
  );
};

export default StatCard;
