import { useQuery } from "@tanstack/react-query";

import {
  getDashboardSummary,
  type DashboardSummary,
} from "../api/dashboardApi";

export function useDashboard() {
  return useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
