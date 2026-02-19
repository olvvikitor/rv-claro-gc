import { createPortal } from "react-dom";
import { useEffect, useState, useMemo } from "react";
import { X, TrendingUp, AlertCircle, Percent, Receipt, Wallet } from "lucide-react";
import { SummaryData } from "../../types/dashboard";
import { formatCurrency } from "@/shared/utils/formatCurrency";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    data: SummaryData;
    maxWidth?: string;
}

/* =========================
   FUNÇÕES DE CÁLCULO
========================= */
export function getFaixa(vendas: number): string {
    if (vendas <= 6) return "<70%";
    if (vendas >= 7 && vendas < 10) return ">=70%";
    if (vendas >= 10 && vendas < 20) return ">=100%";
    return ">=150%";
}

export function valorAplicado(vendas: number): number {
    if (vendas <= 6) return 5;
    if (vendas >= 7 && vendas < 10) return 10;
    if (vendas >= 10 && vendas < 20) return 20;
    return 25
}

export function getDescontoABS(abs: number): number {
    if (abs <= 4) return 0;
    if (abs <= 15) return 15;
    if (abs <= 30) return 30;
    if (abs <= 50) return 40;
    return 50;
}

export function getDescontoMonitoria(percent: number): number {
    if (percent <= 5) return 0;
    if (percent <= 10) return 20;
    if (percent <= 20) return 30;
    if (percent <= 40) return 50;
    if (percent <= 50) return 80;
    return 100;
}

export default function ModalCalculo({ open, onClose, data, maxWidth = "max-w-2xl" }: ModalProps) {
    const [mounted, setMounted] = useState(false);
    const dados = data?.dados;
    if (!dados) {
        return null
    }

    console.log(dados)

    const faixa = useMemo(() => (dados ? getFaixa(dados.vendasRealizadas) : ""), [dados]);
    const descAbs = useMemo(() => (dados ? getDescontoABS(dados.absPercentual) : 0), [dados]);
    const descMonitoria = useMemo(() => (dados ? getDescontoMonitoria(dados.erroCriticoPercent) : 0), [dados]);

    const totalDescontoPercent = descAbs + descMonitoria;
    // Verifica se houve ganho por quebra de agenda (se o valor for > 0)
    const temBonificacaoAgenda = dados.bonusValor > 0;

    useEffect(() => {
        setMounted(true);
        if (open) document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
    }, [open]);

    if (!mounted || !open || !dados) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div
                className={`bg-zinc-50 dark:bg-zinc-900 rounded-3xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-hidden relative border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Detalhamento da Remuneração</h2>
                        <p className="text-sm text-zinc-500">Confira o passo a passo do seu cálculo</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <X size={20} className="text-zinc-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">

                    {/* 1. VALOR BRUTO */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                            <TrendingUp size={18} />
                            <h3>Regras de Cálculo (Bruto)</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <CardItem label="Vendas Realizadas" value={dados.vendasRealizadas} />
                            <CardItem label="Faixa Atingida" value={faixa} highlight />
                            <CardItem label="Valor por Unidade" value={formatCurrency(valorAplicado(dados.vendasRealizadas))} />
                            <CardItem label="Cálculo Base" value={`${valorAplicado(dados.vendasRealizadas)} x ${formatCurrency(valorAplicado(dados.vendasRealizadas))}`} />

                            <div className="sm:col-span-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex justify-between items-center">
                                <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">Subtotal Bruto de Vendas</span>
                                <span className="text-blue-700 dark:text-blue-300 font-bold">{formatCurrency(dados.rvBase)}</span>
                            </div>
                        </div>
                    </section>

                    {/* 2. NOVO: BONIFICAÇÕES EXTRAS */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                            <Wallet size={18} />
                            <h3>Bonificações Extras</h3>
                        </div>
                        <div className={`p-4 rounded-2xl border transition-colors ${temBonificacaoAgenda ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800' : 'bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 opacity-60'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Quebra de Agenda (Incentivo)</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Meta: Menos de 30% de quebra</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${temBonificacaoAgenda ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'}`}>
                                        {dados.quebraAgendaPercent}% atingido
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center border-t border-emerald-200/50 dark:border-emerald-800/50 pt-2">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Valor Adicional:</span>
                                <span className={`font-bold ${temBonificacaoAgenda ? 'text-emerald-600' : 'text-zinc-400'}`}>
                                    + {formatCurrency(dados.bonusValor)}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* 3. DEFLATORES */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                            <Percent size={18} />
                            <h3>Aplicando Deflatores</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-400 uppercase font-bold mb-2">Absenteísmo (ABS)</p>
                                <div className="flex justify-between text-sm dark:text-white">
                                    <span>Índice: {dados.absPercentual}%</span>
                                    <span className="text-red-500 font-semibold">-{descAbs}%</span>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                                <p className="text-xs text-zinc-400 uppercase font-bold mb-2">Qualidade</p>
                                <div className="flex justify-between text-sm dark:text-white">
                                    <span>Índice: {dados.erroCriticoPercent}%</span>
                                    <span className="text-red-500 font-semibold">-{descMonitoria}%</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. RESULTADO FINAL */}
                    <section className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="bg-emerald-600 dark:bg-emerald-500 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Receipt size={22} />
                                    <span className="font-bold text-lg">Resumo Financeiro</span>
                                </div>
                            </div>
                            <div className="space-y-2 border-b border-white/20 pb-4 mb-4 text-sm opacity-90">
                                <div className="flex justify-between">
                                    <span>Subtotal Vendas + Bonificações:</span>
                                    <span>{formatCurrency(dados.rvBase + dados.bonusValor)}</span>
                                </div>
                                <div className="flex justify-between text-orange-200 font-bold">
                                    <span>Descontos Aplicados ({totalDescontoPercent}%):</span>
                                    <span>- {formatCurrency(dados.descontoDeflatores)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-medium uppercase tracking-wider">Valor Líquido:</span>
                                <span className="text-3xl font-black">{formatCurrency(dados.rvFinal)}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>,
        document.body
    );
}
/* =========================
   COMPONENTES AUXILIARES
========================= */

function CardItem({ label, value, highlight = false }: { label: string; value: any; highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
            <span className={`font-semibold ${highlight ? "text-blue-600 dark:text-blue-400" : "text-zinc-800 dark:text-zinc-200"}`}>
                {value}
            </span>
        </div>
    );
}