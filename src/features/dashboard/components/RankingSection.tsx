import React, { useEffect, useMemo } from "react";
import { Trophy, Medal } from "lucide-react";
import { useRanking } from "../hook/useRanking";
import { User } from "@/layout/Topbar";

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

  const formatCurrency = (value: number = 0) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  if (loading) return <p>Carregando ranking...</p>;
  if (error) return <p>{error}</p>;

  const highestValue = data?.[0]?.rvFinal ?? 1;

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl dark:bg-gray-900/80 transition-all mt-8 border border-gray-200 dark:border-gray-800 transition-all duration-1300">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="text-yellow-500 animate-pulse" />
        <h2 className="text-2xl font-bold dark:text-white">
          Ranking do Mês
        </h2>
      </div>

      <div className="space-y-4">
        {data?.map((item, index) => {
          const position = index + 1;
          const isLoggedUser =
            user?.matricula === item.operador.matricula;

          const percentage = (item.rvFinal / highestValue) * 100;

          const medalColor =
            position === 1
              ? "text-yellow-500"
              : position === 2
              ? "text-gray-400"
              : position === 3
              ? "text-orange-500"
              : "text-gray-300";

          const cardStyle =
            position === 1
              ? "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-700/40 dark:to-yellow-600/20 transition-all duration-1300"
              : "bg-white dark:bg-gray-800 transition-all duration-1300";

          return (
            <div
              key={item.operador.matricula}
              className={`relative p-5 rounded-2xl border transition-all shadow-md shadow
              ${cardStyle}
              ${isLoggedUser ? "ring-2 ring-purple-500 shadow-purple-200" : ""}`}
            >
              {/* Conteúdo principal */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  
                  {/* Medalha */}
                  {position <= 3 ? (
                    <Medal className={`${medalColor}`} size={26} />
                  ) : (
                    <span className="text-gray-400 font-bold">
                      {position}°
                    </span>
                  )}

                  {/* Nome */}
                  <div>
                    <p
                      className={`font-semibold text-lg ${
                        isLoggedUser
                          ? "text-green-600"
                          : "dark:text-white"
                      }`}
                    >
                      {item.operador.nome}
                      {isLoggedUser && " (Você)"}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(item.rvFinal)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-700"
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
