import { useQuery } from "@tanstack/react-query";

import {
  getPortfolio,
  type PortfolioResponse,
} from "../api/portfolioApi";

export function usePortfolio(slug: string) {
  return useQuery<PortfolioResponse>({
    queryKey: ["portfolio", slug],
    queryFn: () => getPortfolio(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}
