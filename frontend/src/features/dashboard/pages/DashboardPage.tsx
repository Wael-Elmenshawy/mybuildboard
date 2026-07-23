import React from "react";

import DashboardStats from "../components/DashboardStats";
import ProfileCompletionCard from "../components/ProfileCompletionCard";
import RecentActivityCard from "../components/RecentActivityCard";
import RecentProjectsCard from "../components/RecentProjectsCard";
import { useDashboard } from "../hooks/useDashboard";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back to MyBuildBoard.
        </p>
      </div>

      <DashboardStats stats={data.stats} />

      <ProfileCompletionCard
        completion={data.profile_completion}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentProjectsCard
          projects={data.recent_projects}
        />

        <RecentActivityCard
          activities={data.recent_activity}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
