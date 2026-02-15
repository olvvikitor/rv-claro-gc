import React, { useEffect, useState } from "react";
import { useSummary } from "../hook/useSummary";
import { HandCoins, HelpCircle } from "lucide-react";
import { Cards } from './Card'
import HelpModal from '../../../layout/ModalAjuda';
import RemuneracaoModal from "../../../layout/ModalAjuda";
export interface SummaryData {
  operador: {
    matricula: string;
    nome: string;
    supervisor: string;
    coordenador: string;
  };
  competencia: string;
  dados: {
    vendasRealizadas: number;
    valorUnitarioAplicado: number;
    rvBase: number;
    bonusValor: number;
    descontoDeflatores: number;
    descontoFaltasValor: number;
    rvFinal: number;
    createdAt: string
  };
}
export interface SummaryProps {
  ano: number
  mes: number
}

const SummarySection: React.FC<SummaryProps> = ({ ano, mes }) => {

  const { data, loading, error, getSummary } = useSummary();
const [openModal, setOpenModal] = useState(false);

  const ultimaAtt = new Date(data?.dados.createdAt ?? "");
  const ultimaAttStr = ultimaAtt.toLocaleDateString('pt-BR').split(',')[0]


  useEffect(() => {
    getSummary(ano, mes);
  }, [ano, mes]);

  const formatCurrency = (value: number = 0) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bg-white rounded-2xl p-8 shadow-md dark:bg-gray-900 transition-all duration-1000 ease-in-out">

        {/* Header + Filtros */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold dark:text-white">
                Remuneração variável
              </h2>
              <HandCoins
                size={23}
                className="text-green-600 dark:text-yellow-400"
              />
            </div>

            <p className="text-gray-500 text-sm dark:text-gray-300">
              Valor que você vai receber neste mês
            </p>
          </div>

          {/* ❓ Ícone de ajuda */}
          <button
            onClick={() => setOpenModal(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <HelpCircle className="text-gray-500 hover:text-green-600" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Cards
            title="Valor Bruto"
            value={formatCurrency(data?.dados.rvBase)}
            color="green"
            description={`(${data?.dados.vendasRealizadas} vendas × R$ ${data?.dados.valorUnitarioAplicado})
        = ${formatCurrency(data?.dados.rvBase)}`} />
          <Cards
            title="Desconto"
            value={formatCurrency(data?.dados.descontoDeflatores)}
            color="red"
            description={`Descontos aplicados:
- ABS: ${data?.dados.absPercentual}%
- Erros Críticos: ${data?.dados.erroCriticoQtd}
/ Total desconto: ${formatCurrency(data?.dados.descontoDeflatores)}`}
          />
          <Cards
            title="Bonificações"
            value={formatCurrency(data?.dados.bonusValor)}
            color="blue"
            description={`Bônus calculado sobre o valor base:
${formatCurrency(data?.dados.rvBase)} + bônus(Quebra de agenda: ${data?.dados.bonusValor}%)
= ${formatCurrency(data?.dados.bonusValor)}`}
          />
          <Cards
            title="Total a Receber"
            value={formatCurrency(data?.dados.rvFinal)}
            color="darkGreen"
            description={`Cálculo final:
Base (${formatCurrency(data?.dados.rvBase)})
+ Bônus (${formatCurrency(data?.dados.bonusValor)})
- Descontos (${formatCurrency(data?.dados.descontoDeflatores)})
= ${formatCurrency(data?.dados.rvFinal)}`}
          />

        </div>
      </div>
      <RemuneracaoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );


};



export default SummarySection;
