import { useState } from "react";
import api from "@/shared/api/apiClient";
import { SummaryData } from "../types/dashboard";

export const useSummary = () => {
    const [data, setData] = useState<SummaryData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getSummary = async (ano: number, mes: number) => {
        try {
            setLoading(true);
            setError(null);
            setData(null);
            const response = await api.get(`/operador?ano=${ano}&mes=${mes}`);
            setData(response.data);
        } catch {
            setError("Erro ao buscar resumo");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, getSummary };
};
