import { useQuery } from "@tanstack/react-query";

import { getPortfolio } from "../api/portfolioApi";

export function usePortfolio(slug: string) {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: () => getPortfolio(slug),
    enabled: !!slug,
  });
}
