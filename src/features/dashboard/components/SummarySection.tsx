import React, { useEffect, useState } from "react";
import { useSummary } from "../hook/useSummary";
import { HandCoins } from "lucide-react";

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

const SummarySection: React.FC = () => {
  const { data, loading, error, getSummary } = useSummary();
  const currentDate = new Date();
  const ultimaAtt = new Date(data?.dados.createdAt ?? "");
  const ultimaAttStr = ultimaAtt.toLocaleDateString('pt-BR').split(',')[0]


  const [ano, setAno] = useState(currentDate.getFullYear());
  const [mes, setMes] = useState(currentDate.getMonth() + 1);

  console.log(ano, mes)

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
    <div className="bg-white rounded-2xl p-8 shadow-md dark:bg-gray-900 transition-all duration-1000 ease-in-out">

      {/* Header + Filtros */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          {/* linha do titulo */}
          <div className="flex itemns-center gap-3">
            <h2 className="text-xl font-semibold dark:text-white">
              Remuneração variável
            </h2>
          <HandCoins
            size={23}
            className="text-green-600 dark:text-yellow-400 transition-all duration-900"
          />
          </div>
            <p className="text-gray-500 text-sm dark:gray-300">
              Valor que você vai receber neste mês
            </p>
        </div>

        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400">Mês:</h1>
          <select
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 dark:text-gray-400"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1} className="text-black dark:bg-zinc-800 dark:text-white">
                {i + 1}
              </option>
            ))}
          </select>

          <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400">Ano:</h1>
          <select
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            className="border rounded-lg px-3 py-2 dark:text-gray-400"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = currentDate.getFullYear() - i;
              return (
                <option key={year} value={year} className="text-black dark:bg-zinc-800 dark:text-white">
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Última atualização */}
      <div className="text-right text-sm text-gray-500 mb-4 dark:text-white">
        <p>Última atualização</p>
        <p className="dark:text-gray-400">{ultimaAttStr ?? "-"}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Valor Bruto" value={formatCurrency(data?.dados.rvBase)} color="green" />
        <Card title="Desconto" value={formatCurrency(data?.dados.descontoDeflatores)} color="red" />
        <Card title="Bonificações" value={formatCurrency(data?.dados.bonusValor)} color="blue" />
        <Card title="Total a Receber" value={formatCurrency(data?.dados.rvFinal)} color="darkGreen" />
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  value: string;
  color: "green" | "red" | "blue" | "darkGreen";
}

const Card: React.FC<CardProps> = ({ title, value, color }) => {
  const colors = {
    green: "border-green-300 text-green-600",
    red: "border-red-300 text-red-600",
    blue: "border-blue-300 text-blue-600",
    darkGreen: "bg-green-600 text-white",
  };

  return (
    <div className={`rounded-xl p-6 border shadow-sm ${colors[color]}`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default SummarySection;
