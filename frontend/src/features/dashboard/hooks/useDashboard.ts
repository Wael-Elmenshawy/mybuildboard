import { useQuery } from "@tanstack/react-query";

import {
  DashboardResponse,
  getDashboard,
} from "../api/dashboardApi";

export const useDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};
