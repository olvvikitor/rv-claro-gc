import React from "react";

interface DateFilterProps {
  ano: number;
  mes: number;
  onAnoChange: (ano: number) => void;
  onMesChange: (mes: number) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  ano,
  mes,
  onAnoChange,
  onMesChange,
}) => {
  const currentDate = new Date();

  return (
    <div className="flex gap-4 items-center">
      <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
        Mês:
      </h1>

      <select
        value={mes}
        onChange={(e) => onMesChange(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 dark:text-gray-400"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
        Ano:
      </h1>

      <select
        value={ano}
        onChange={(e) => onAnoChange(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 dark:text-gray-400"
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
  );
};

export default DateFilter;
