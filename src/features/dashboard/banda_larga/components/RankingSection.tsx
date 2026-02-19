import React, { useEffect, useMemo } from "react";
import { Trophy, Medal, Crown } from "lucide-react";
import { useRanking } from "../../hooks/useRanking";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import type { User } from "@/shared/types/user";

export interface RankingProps {
  ano: number;
  mes: number;
}

const RankingSection: React.FC<RankingProps> = ({ ano, mes }) => {
  const { data, loading, error, getRanking } = useRanking();

  useEffect(() => {
    getRanking(ano, mes);
  }, [ano, mes]);

  const user: User | null = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-md mt-8 animate-pulse">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-48 mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-red-600 dark:text-red-400 mt-8">
        {error}
      </div>
    );
  }

  const highestValue = data?.[0]?.rvFinal ?? 1;

  return (
    <div
      className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 
      shadow-md border border-zinc-100 dark:border-zinc-800 
      transition-all duration-500 mt-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
          <Trophy size={22} className="text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
          Ranking do Mês
        </h2>
        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-full font-medium">
          {data?.length ?? 0} operadores
        </span>
      </div>

      <div className="space-y-3">
        {data?.map((item, index) => {
          const position = index + 1;
          const isLoggedUser = user?.matricula === item.operador.matricula;
          const percentage = (item.rvFinal / highestValue) * 100;

          const getMedalIcon = () => {
            if (position === 1)
              return <Crown size={22} className="text-yellow-500 drop-shadow-md" />;
            if (position === 2)
              return <Medal size={22} className="text-zinc-400" />;
            if (position === 3)
              return <Medal size={22} className="text-amber-600" />;
            return (
              <span className="w-[22px] h-[22px] flex items-center justify-center text-sm font-bold text-zinc-400 dark:text-zinc-500">
                {position}°
              </span>
            );
          };

          const cardBg =
            position === 1
              ? "bg-gradient-to-r from-yellow-50 via-amber-50/50 to-white dark:from-yellow-900/20 dark:via-amber-900/10 dark:to-zinc-900 border-yellow-200/60 dark:border-yellow-800/30"
              : position === 2
                ? "bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 border-zinc-200/60 dark:border-zinc-700/50"
                : position === 3
                  ? "bg-gradient-to-r from-amber-50/50 to-white dark:from-amber-900/10 dark:to-zinc-900 border-amber-200/60 dark:border-amber-800/30"
                  : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800";

          const barColor =
            position === 1
              ? "bg-gradient-to-r from-yellow-100 to-amber-400"
              : position === 2
                ? "bg-gradient-to-r from-zinc-100 to-zinc-500"
                : position === 3
                  ? "bg-gradient-to-r from-amber-100 to-orange-900"

                  : "bg-gradient-to-r from-emerald-100 to-emerald-900";

          return (
            <div
              key={item.operador.matricula}
              className={`relative p-5 rounded-2xl border transition-all duration-300 
                shadow-sm hover:shadow-md hover:-translate-y-0.5
                ${cardBg}
                ${isLoggedUser ? "ring-2 ring-red-500/60 shadow-red-100 dark:shadow-red-900/20" : ""}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {/* Medal / Position */}
                  <div className="w-10 h-10 flex items-center justify-center">
                    {getMedalIcon()}
                  </div>

                  {/* Name */}
                  <div>
                    <p
                      className={`font-semibold text-base ${isLoggedUser
                          ? "text-red-600 dark:text-red-400"
                          : "text-zinc-800 dark:text-white"
                        }`}
                    >
                      {item.operador.nome}
                      {isLoggedUser && (
                        <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                          Você
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold dark:text-zinc-100 font-medium">
                      {formatCurrency(item.rvFinal)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingSection;
