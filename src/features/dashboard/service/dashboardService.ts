import api from "../../../service/api";
import { Result } from "../types/result";

export async function getResults():Promise<Result[]> {
  const response = await api.get("/results");
  return response.data;
}
export interface DashboardSummary{
  valorBruto: number;
  desconto: number;
  bonificacoes: number;
  totalReceber: number;
  ultimaAtualizacao: string;
}

export async function getSummary():Promise<DashboardSummary>{
  const response = await api.get<DashboardSummary>('/dashboardSummary')
  return response.data
  
}
