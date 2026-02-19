import React from "react";
import { Calendar } from "lucide-react";

interface DateFilterProps {
  ano: number;
  mes: number;
  onAnoChange: (ano: number) => void;
  onMesChange: (mes: number) => void;
}

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DateFilter: React.FC<DateFilterProps> = ({
  ano,
  mes,
  onAnoChange,
  onMesChange,
}) => {
  const currentDate = new Date();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
        <Calendar size={20} className="text-red-500" />
        <span className="text-sm font-semibold uppercase tracking-wide">Período</span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={mes}
          onChange={(e) => onMesChange(Number(e.target.value))}
          className="px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
            rounded-xl text-sm text-zinc-700 dark:text-zinc-300 font-medium
            focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50
            transition-all duration-200 cursor-pointer appearance-none
            shadow-sm hover:shadow-md"
        >
          {meses.map((nome, i) => (
            <option key={i + 1} value={i + 1}>
              {nome}
            </option>
          ))}
        </select>

        <select
          value={ano}
          onChange={(e) => onAnoChange(Number(e.target.value))}
          className="px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
            rounded-xl text-sm text-zinc-700 dark:text-zinc-300 font-medium
            focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50
            transition-all duration-200 cursor-pointer appearance-none
            shadow-sm hover:shadow-md"
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = currentDate.getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DateFilter;
