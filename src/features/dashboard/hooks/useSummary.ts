import { useState } from "react";
import api from "@/shared/api/apiClient";
import { SummaryData } from "../types/dashboard";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/features/auth/hooks/useLogin";

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
        } catch (err: any) {
            const axiosError = err as AxiosError<ApiErrorResponse>;

            const message =
                axiosError.response?.data?.error?.message ||
                axiosError.response?.data?.message ||
                "Erro ao buscar resultados";
            setError(message)
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, getSummary };
};
