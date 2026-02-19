import { useUploadFile } from "@/shared/hooks/useUploadFile";
import { X, Upload, FileSpreadsheet, Trash2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type UploadModalProps = {
    open: boolean;
    onClose: () => void;
};

export function UploadModal({ open, onClose }: UploadModalProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleSuccess = () => {
        toast.success("Arquivo enviado com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            theme: "colored",
        });

        setFile(null);
        onClose();
    };

    const handleError = (message?: string) => {
        toast.error(message || "Erro ao enviar arquivo.", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
        });
    };

    const { enviarFile, loading, error } = useUploadFile({
        onSuccess: handleSuccess,
        onError: handleError,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selected = event.target.files?.[0];
        if (!selected) return;

        if (!selected.name.endsWith(".xlsx")) {
            toast.warning("Apenas arquivos .xlsx são permitidos.");
            return;
        }

        setFile(selected);
    }

    function handleUpload() {
        if (!file) {
            toast.warning("Selecione um arquivo antes de enviar.");
            return;
        }

        enviarFile(file);
    }

    function handleClose() {
        setFile(null);
        onClose();
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleClose}
        >
            <div
                className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col border border-zinc-200 dark:border-zinc-800 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                            <Upload size={20} className="text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-800 dark:text-white">
                            Atualização de RV
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                        <X size={20} className="text-zinc-400 hover:text-red-500 transition" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                    {!file ? (
                        <label className="w-full h-56 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 bg-zinc-50 dark:bg-zinc-800/50 group">
                            <div className="p-4 bg-zinc-100 dark:bg-zinc-700 rounded-2xl mb-4 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                                <FileSpreadsheet size={32} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-300 font-medium">
                                Clique para selecionar um arquivo
                            </p>
                            <p className="text-zinc-400 text-xs mt-1">.xlsx</p>
                            <input
                                type="file"
                                accept=".xlsx"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </label>
                    ) : (
                        <div className="w-full h-56 border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl flex flex-col items-center justify-center gap-3 bg-emerald-50 dark:bg-emerald-900/10">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                <FileSpreadsheet size={28} className="text-emerald-600" />
                            </div>
                            <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                {file.name}
                            </p>
                            <button
                                onClick={() => setFile(null)}
                                className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 text-sm font-medium transition"
                            >
                                <Trash2 size={14} />
                                Remover
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-700 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 
                        hover:bg-zinc-200 dark:hover:bg-zinc-700 font-medium text-sm transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-medium text-sm
                        hover:from-red-500 hover:to-red-400 transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-md shadow-red-200 dark:shadow-red-900/30
                        flex items-center gap-2"
                    >
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
