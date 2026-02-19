import React, { useState } from "react";
import { HandCoins, HelpCircle, TrendingUp, TrendingDown, Gift, DollarSign, Calculator } from "lucide-react";
import { Cards } from "../../banda_larga/components/Card";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { SummaryData } from "../../types/dashboard";
import ModalCalculoUP from "./ModalCalculoUP";
import RemuneracaoModalUP from "./RemuneracaoModalUP";

export interface SummaryProps {
  data: SummaryData | null;
  loading: boolean;
  error: string | null;
}

const SummarySectionUP: React.FC<SummaryProps> = ({ data, loading, error }) => {
  const dataTeste = data
  const [openModal, setOpenModal] = useState(false);
  const [openModalCalculo, setOpenModalCalculo] = useState(false)
  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-md animate-pulse">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-zinc-200 dark:bg-zinc-700 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 
        shadow-md border border-zinc-100 dark:border-zinc-800
        transition-all duration-500 ease-in-out"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <HandCoins size={22} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
                Remuneração Variável
              </h2>
            </div>
            <p className="text-yellow-500 text-sm dark:text-yellow-200 ml-1 text-[12px]">
              Valores sujeitos a alterações conforme alterações de indicadores até fechamento do mês
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Base de Cálculo */}
            <button
              onClick={() => setOpenModal(true)}
              className="
      flex items-center gap-2
      px-4 py-2.5 rounded-xl
      bg-zinc-100 dark:bg-zinc-800
      hover:bg-zinc-200 dark:hover:bg-zinc-700
      transition-all duration-200
      group
    "
            >
              <HelpCircle
                className="text-zinc-400 group-hover:text-red-500 transition-colors"
                size={18}
              />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-red-500 transition-colors">
                Regras de cálculo
              </span>
            </button>

            {/* Como foi calculado */}
            <button
              onClick={() => setOpenModalCalculo(true)}
              className="
      flex items-center gap-2
      px-4 py-2.5 rounded-xl
      bg-zinc-100 dark:bg-zinc-800
      hover:bg-zinc-200 dark:hover:bg-zinc-700
      transition-all duration-200
      group
    "
            >
              <Calculator
                className="text-zinc-400 group-hover:text-red-500 transition-colors"
                size={18}
              />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-red-500 transition-colors">
                Como foi calculado
              </span>
            </button>

          </div>



        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Cards
            title="Valor Bruto"
            value={formatCurrency(data?.dados.rvBase)}
            color="green"
            icon={<TrendingUp size={18} />}
            description={`(${data?.dados.vendasRealizadas} vendas × R$ ${data?.dados.valorUnitarioAplicado}) = ${formatCurrency(data?.dados.rvBase)}`}
          />
          <Cards
            title="Bonificações"
            value={formatCurrency(data?.dados.bonusValor)}
            color="blue"
            icon={<Gift size={18} />}
            description={`Bônus calculado sobre o valor base: ${formatCurrency(data?.dados.rvBase)} + bônus = ${formatCurrency(data?.dados.bonusValor)}`}
          />
          <Cards
            title="Desconto"
            value={formatCurrency(data?.dados.descontoDeflatores)}
            color="red"
            icon={<TrendingDown size={18} />}
            description={`Descontos aplicados: ABS: ${data?.dados.absPercentual ?? 0}% | Erros Críticos: ${data?.dados.erroCriticoQtd ?? 0} | Total: ${formatCurrency(data?.dados.descontoDeflatores)}`}
          />

          <Cards
            title="Total Previsto"
            value={formatCurrency(data?.dados.rvFinal)}
            color="darkGreen"
            icon={<DollarSign size={18} />}
            description={`Base (${formatCurrency(data?.dados.rvBase)}) + Bônus (${formatCurrency(data?.dados.bonusValor)}) - Descontos (${formatCurrency(data?.dados.descontoDeflatores)}) = ${formatCurrency(data?.dados.rvFinal)}`}
          />
        </div>
      </div>

      <RemuneracaoModalUP
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <ModalCalculoUP
        open={
          openModalCalculo
        }
        onClose={() => setOpenModalCalculo(false)}
        data={dataTeste as SummaryData}
      ></ModalCalculoUP>
    </>
  );
};

export default SummarySectionUP;
