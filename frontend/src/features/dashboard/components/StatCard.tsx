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
    <Card className="group hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-300 group-hover:bg-gray-200 ${iconClassName}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
