import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../service/dashboardService";
import { useState } from "react";
import api from "../../../service/api";
import { SummaryData } from "../components/SummarySection";

// useSummary.ts
export const useRanking = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRanking = async (ano: number, mes: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/operador/ranking?ano=${ano}&mes=${mes}`);
      setData(response.data);
    } catch (err) {
      setError("Erro ao buscar resumo");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getRanking };
};
