import React from "react";
import { XCircle, TrendingUp, AlertTriangle, Percent } from "lucide-react";
import { createPortal } from "react-dom";

interface RemuneracaoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RemuneracaoModalUP: React.FC<RemuneracaoModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fadeIn border border-zinc-200 dark:border-zinc-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-zinc-200 dark:border-zinc-700 sticky top-0 bg-white dark:bg-zinc-900 rounded-t-2xl z-10 p-4">
                    <h2 className="text-xl font-bold text-zinc-800 dark:text-white flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                            <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={20} />
                        </div>
                        Como é calculada a Remuneração Variável
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                    >
                        <XCircle className="text-zinc-400 hover:text-red-500 transition" size={22} />
                    </button>
                </div>

                <div className="p-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
                    {/* Regra principal */}
                    <section>
                        <h3 className="font-bold text-base mb-3 text-zinc-800 dark:text-white">
                            📌 Regra Principal
                        </h3>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 space-y-2">
                            <p>
                                A remuneração variável é calculada
                                conforme a faixa de meta atingida no mês.
                            </p>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                O pagamento é apurado no mês seguinte ao trabalhado.
                                <br />
                                <span className="font-medium">Fevereiro</span> → Trabalhado |{" "}
                                <span className="font-medium">Março</span> → Apurado |{" "}
                                <span className="font-medium">Abril</span> → Pagamento
                            </p>
                        </div>
                    </section>

                    {/* Faixas */}
                    <section>
                        <h3 className="font-bold text-base mb-3 text-zinc-800 dark:text-white">
                            💰 Faixa de Valor Unitário
                        </h3>
                        <p className="mb-3">
                            O valor por venda aumenta conforme o operador atinge novas faixas
                            de meta.
                        </p>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 p-4 rounded-xl space-y-1.5">
                            <p>• Ate 59,99% → <span className="font-semibold">R$ 0,00</span></p>
                            <p>• De 60% a 79,9% → <span className="font-semibold">R$ 70,00</span></p>
                            <p>• De 80% a 99% → <span className="font-semibold">R$ 100,00</span></p>
                            <p>• De 100% a 119% → <span className="font-semibold">R$ 200,00</span></p>
                            <p>• De 120% a 149% → <span className="font-semibold">R$ 220,00</span></p>
                            <p>• De 150% a 200% → <span className="font-semibold">R$ 250,00</span></p>
                            <p>• De 201% a 249% → <span className="font-semibold">R$ 300,00</span></p>
                            <p>• Acima de 250% → <span className="font-semibold">R$ 500,00</span></p>
                        </div>
                        <p className="mt-3 font-semibold text-emerald-600 dark:text-emerald-400">
                            ✨ Quem vende mais, ganha mais!
                        </p>
                    </section>

                    {/* Bonus */}
                    <section>
                        <h3 className="font-bold text-base mb-3 text-zinc-800 dark:text-white flex items-center gap-2">
                            <Percent size={18} className="text-sky-500" />
                            Bônus Extra
                        </h3>

                        <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/40 p-4 rounded-xl">
                            Operadores com até <strong>30% de quebra de agenda</strong> recebem
                            <span className="font-bold text-sky-600 dark:text-sky-400">
                                {" "}+20% sobre o valor total da RV
                            </span>.
                        </div>
                    </section>

                    {/* Deflatores */}
                    <section>
                        <h3 className="font-bold text-base mb-3 text-zinc-800 dark:text-white flex items-center gap-2">
                            <AlertTriangle size={18} className="text-rose-500" />
                            Deflatores (Descontos por Indicador)
                        </h3>

                        <div className="space-y-4">

                            {/* ERRO CRÍTICO */}
                            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 p-4 rounded-xl space-y-2">
                                <p className="font-semibold text-rose-700 dark:text-rose-400">
                                    🔎 Erro Crítico (Auditoria / Ouvidoria / Churn / Qualidade)
                                </p>

                                <ul className="space-y-1 text-sm">
                                    <li>0% a 5% → 0% de desconto</li>
                                    <li>5,1% a 10% → 20% de desconto</li>
                                    <li>10,1% a 20% → 30% de desconto</li>
                                    <li>20,1% a 40% → 50% de desconto</li>
                                    <li>40,1% a 50% → 80% de desconto</li>
                                    <li>50,1% a 100% → 100% de desconto</li>
                                </ul>
                            </div>

                            {/* ABS */}
                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 p-4 rounded-xl space-y-2">
                                <p className="font-semibold text-amber-700 dark:text-amber-400">
                                    📊 ABS
                                </p>

                                <ul className="space-y-1 text-sm">
                                    <li>0% a 4% → 0% de desconto</li>
                                    <li>4,1% a 15% → 15% de desconto</li>
                                    <li>15,1% a 30% → 30% de desconto</li>
                                    <li>50,1% a 100% → 50% de desconto</li>
                                </ul>
                            </div>

                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                O percentual de desconto é aplicado sobre o valor total da
                                Remuneração Variável apurada no mês.
                                As faixas podem sofrer alterações conforme política do cliente.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default RemuneracaoModalUP;
