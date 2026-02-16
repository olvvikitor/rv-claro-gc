import api from "@/shared/api/apiClient";
import { DashboardSummary, Result } from "../types/dashboard";

export async function getResults(): Promise<Result[]> {
    const response = await api.get("/results");
    return response.data;
}

export async function getSummary(): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>("/dashboardSummary");
    return response.data;
}
