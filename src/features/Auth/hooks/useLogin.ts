import { useState } from "react";
import api from "@/shared/api/apiClient";
import { LoginDto } from "../services/authService";

interface LoginResponse {
    token: string;
    user: Record<string, unknown>;
}

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<LoginResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function logar(payload: LoginDto): Promise<LoginResponse | null> {
        try {
            setLoading(true);
            setError(null);
            const response = await api.post<LoginResponse>("/auth/login", payload);
            setData(response.data);
            return response.data;
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Erro ao fazer login";
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, logar };
}
