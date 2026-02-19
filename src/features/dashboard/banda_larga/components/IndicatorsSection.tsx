import React from "react";
import { Cards } from "./Card";
import { SummaryData } from "../../types/dashboard";
import { ShoppingCart, AlertOctagon, Ban, XCircle, ChartNoAxesGantt, Coins } from "lucide-react";
import { getFaixa, valorAplicado } from "./ModalCalculo";
import { formatCurrency } from "@/shared/utils/formatCurrency";

interface IndicatorsSectionProps {
    data: SummaryData | null;
    loading: boolean;
    error: string | null;
}

const IndicatorsSection: React.FC<IndicatorsSectionProps> = ({ data, loading, error }) => {
    if (loading) {
        return (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-800/50 rounded-2xl" />
                ))}
            </div>
        );
    }

    if (error || !data) return null;

    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <Cards
                title="Vendas Realizadas"
                value={data.dados.vendasRealizadas.toString()}
                color="green"
                icon={<ShoppingCart size={18} />}
                description="Total de vendas realizadas e instaladas no período."
                variant="compact"
            />
            <Cards
                title="Faixa Atual"
                value={getFaixa(data.dados.vendasRealizadas)}
                color="green"
                icon={<ChartNoAxesGantt size={18} />}
                description="Total de vendas realizadas e instaladas no período."
                variant="compact"

            />
            <Cards
                title="Valor por venda"
                value={formatCurrency(valorAplicado(data.dados.valorUnitarioAplicado))}
                color="green"
                icon={<Coins size={18} />}
                description="Total de vendas realizadas e instaladas no período."
                variant="compact"

            />

            <Cards
                title="% Quebra de Agenda"
                value={`${data.dados.quebraAgendaPercent ?? 0}%`}
                color={`${(data.dados.quebraAgendaPercent ?? 0) > 30 ? "red" : "blue"}`}
                icon={<XCircle size={18} />}
                description="Percentual de quebra de agenda (cancelamentos/agendamentos não cumpridos)."
                variant="compact"

            />

            <Cards
                title="Erros Críticos"
                value={data.dados.erroCriticoQtd?.toString() ?? "0"}
                color="red"
                icon={<AlertOctagon size={18} />}
                description="Quantidade de erros críticos cometidos no período (Auditoria, Qualidade)."
                variant="compact"

            />

            <Cards
                title="% ABS (Absenteísmo)"
                value={`${data.dados.absPercentual ?? 0}%`}
                color="red"
                icon={<Ban size={18} />}
                description="Percentual de absenteísmo (faltas injustificadas) no período."
                variant="compact"
            />
        </div>
    );
};

export default IndicatorsSection;
