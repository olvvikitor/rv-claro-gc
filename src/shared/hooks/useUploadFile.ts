import api from "@/shared/api/apiClient";
import axios from "axios";
import { useState } from "react";

type UploadOptions = {
    onSuccess?: (data: unknown) => void;
    onError?: (message?: string) => void;
};

export function useUploadFile(options?: UploadOptions) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState<string | null>(null);

    async function enviarFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setError(null);

            const response = await api.post(
                "/upload/input-base",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setData(response.data);

            options?.onSuccess?.(response.data);

        } catch (err: unknown) {
            let message = "Erro ao enviar arquivo";

            if (axios.isAxiosError(err)) {
                message =
                    err.response?.data?.message ||
                    err.message ||
                    message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            setError(message);
            options?.onError?.(message); // ✅ AGORA FUNCIONA
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, enviarFile };
}
