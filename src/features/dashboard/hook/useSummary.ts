import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../service/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
}
