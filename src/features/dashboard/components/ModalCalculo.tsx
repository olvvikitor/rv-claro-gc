import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SummaryData } from "../types/dashboard";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    data: SummaryData
    maxWidth?: string; // ex: "max-w-lg", "max-w-3xl"
}

export default function ModalCalculo({
    open,
    onClose,
    data,
    maxWidth = "max-w-3xl",
}: ModalProps) {
    const [mounted, setMounted] = useState(false);
    let faixa = ''
    let valor_venda = 0

    if (data) {
        if (data.dados.vendasRealizadas <= 6) {
            faixa = '<70%'
        }
        if (data.dados.vendasRealizadas > 6 && data.dados.vendasRealizadas <= 10) {
            faixa = '>=70%'
        }
        if (data.dados.vendasRealizadas > 10 && data.dados.vendasRealizadas <= 20) {
            faixa = '>=100%'
        }
        if (data.dados.vendasRealizadas > 20) {
            faixa = '>=150%'
        }
    }



    useEffect(() => {
        setMounted(true);
        // trava scroll do body
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!mounted || !open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[85vh] overflow-y-auto relative border border-zinc-200 dark:border-zinc-800 animate-fadeIn`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
                        Cálculo Detalhado da Premiação
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Deflatores */}
                <div className="p-6">
                    <div className="rounded-xl border border-blue-200 bg-zinc-200 p-6 dark:border-blue-700 dark:bg-blue-900/20">
                        <h3 className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-300">
                            Análise de Performance
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Vendas Realizadas</span>
                                    <span className="font-medium">
                                        {data?.dados.vendasRealizadas}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Faixa de premiação</span>
                                    <span className="font-medium">
                                        {faixa}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Valor por venda</span>
                                    <span className="font-medium">
                                        {data.dados.valorUnitarioAplicado}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Calculo</span>
                                    <span className="font-medium">
                                        {data.dados.vendasRealizadas} X {data.dados.valorUnitarioAplicado} = {data.dados.rvFinal}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="rounded-xl border border-red-200 bg-red-200 p-6 dark:border-red-700 dark:bg-red-900/20">
                        <h3 className="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-300">
                            Análise de Deflatores
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Vendas Realizadas</span>
                                    <span className="font-medium">
                                        {data?.dados.vendasRealizadas}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Faixa de premiação</span>
                                    <span className="font-medium">
                                        {faixa}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Valor por venda</span>
                                    <span className="font-medium">
                                        {data.dados.valorUnitarioAplicado}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between rounded-lg bg-white p-3 dark:bg-zinc-800">
                                    <span>Calculo</span>
                                    <span className="font-medium">
                                        {data.dados.vendasRealizadas} X {data.dados.valorUnitarioAplicado} = {data.dados.rvFinal}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );

}
