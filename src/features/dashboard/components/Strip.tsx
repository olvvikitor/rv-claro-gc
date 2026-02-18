import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { getProximaFaixaInfo } from "../services/faixaService";
import { SummaryData } from "../types/dashboard";

export interface TicketProps {
  data: SummaryData | null;
}

export const PerformanceTicker: React.FC<TicketProps> = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mensagens = useMemo(() => {
    if (!data?.dados) return [];

    const { vendasRealizadas, valorUnitarioAplicado, rvBase } = data.dados;

    const info = getProximaFaixaInfo(
      Number(vendasRealizadas),
      Number(valorUnitarioAplicado)
    );

    if (!info) {
      return [
        `🏆 Você já está na maior faixa de comissão!`,
        `💰 Seu bruto atual é ${formatCurrency(Number(rvBase))}`,
        `🔥 Performance máxima atingida, parabéns!`
      ];
    }

    const diferenca =
      Number(info.novoBruto) - Number(rvBase);

    return [
      `🚀 Faltam apenas ${info.vendasNecessarias} vendas para subir para faixa ${info.novaFaixa}`,
      `💰 Seu bruto pode chegar a ${formatCurrency(info.novoBruto)} Isso representa +${formatCurrency(diferenca)} no seu resultado`,
      `🔥 Continue assim, você está muito perto`
    ];
  }, [data]);

  useEffect(() => {
    if (!mensagens.length || isPaused) return;

    let charIndex = 0;
    const currentMessage = mensagens[index];
    setDisplayText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        timeoutRef.current = setTimeout(() => {
          setIndex((prev) => (prev + 1) % mensagens.length);
        }, 4000);
      }
    }, 25);

    return () => {
      clearInterval(typingInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, mensagens, isPaused]);

  if (!mensagens.length) return null;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 transition-all duration-300"
    >
      <div className="h-1 absolute top-0 left-0 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 animate-pulse" />

      <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300 font-medium">
        <Sparkles size={16} />
        <span>
          {displayText}
          {isTyping && <span className="animate-pulse ml-1">|</span>}
        </span>
      </div>
    </div>
  );
};
