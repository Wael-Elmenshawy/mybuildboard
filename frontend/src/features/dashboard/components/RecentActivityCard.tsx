import { Activity } from "lucide-react";

import Card from "@/components/ui/Card";

interface RecentActivity {
  type: string;
  title: string;
  created_at: string;
}

interface RecentActivityCardProps {
  activities: RecentActivity[];
}

const RecentActivityCard = ({
  activities,
}: RecentActivityCardProps) => {
  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Activity size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500">
            Your latest actions across MyBuildBoard.
          </p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
          <p className="font-medium text-gray-700">
            No recent activity
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your latest updates will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li
              key={`${activity.type}-${activity.created_at}`}
              className="rounded-xl border border-gray-100 p-4 transition-colors duration-200 hover:bg-gray-50"
            >
              <div className="font-semibold text-gray-900">
                {activity.title}
              </div>

              <div className="mt-1 text-sm text-gray-500">
                {activity.type}
              </div>

              <div className="mt-1 text-xs text-gray-400">
                {new Date(
                  activity.created_at,
                ).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default RecentActivityCard;
