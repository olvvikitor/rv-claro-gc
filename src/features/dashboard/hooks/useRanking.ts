import { useState } from "react";
import api from "@/shared/api/apiClient";
import { RankingItem } from "../types/dashboard";

export const useRanking = () => {
    const [data, setData] = useState<RankingItem[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getRanking = async (ano: number, mes: number) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/operador/ranking?ano=${ano}&mes=${mes}`);
            setData(response.data);
        } catch {
            setError("Erro ao buscar ranking");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, getRanking };
};
