import api from "@/shared/api/apiClient";
import { useState } from "react";

export function useUploadFile() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState<string | null>(null);

    async function enviarFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/upload/input-base", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setData(response.data);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Erro ao enviar arquivo";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, enviarFile };
}
