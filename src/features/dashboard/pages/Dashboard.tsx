import { useState, useEffect } from "react";
import SummarySection from "../banda_larga/components/SummarySection";
import DateFilter from "../banda_larga/components/DateFilter";
import RankingSection from "../banda_larga/components/RankingSection";
import IndicatorsSection from "../banda_larga/components/IndicatorsSection";
import { useSummary } from "../hooks/useSummary";
import { PerformanceTicker } from "../banda_larga/components/Strip";
import SummarySectionUP from "../up/components/SummarySectionUP";
import IndicatorsSectionUP from "../up/components/IndicatorsSectionUP";
import { PerformanceTickerUP } from "../up/components/StripUP";

export default function DashboardPage() {
  const currentDate = new Date();

  const [ano, setAno] = useState(currentDate.getFullYear());
  const [mes, setMes] = useState(currentDate.getMonth() + 1);

  let produto = ''
  const servicoLogado = localStorage.getItem('user')
  if (servicoLogado) {
    const servico = JSON.parse(servicoLogado)
    produto = servico.servico
  }

  if (produto === 'MIS') {
    produto = 'UP'
  }
  if (produto === 'X') {
    produto = 'BL'
  }

  const { data: summaryData, loading: summaryLoading, error: summaryError, getSummary } = useSummary();

  useEffect(() => {
    getSummary(ano, mes);
  }, [ano, mes]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <DateFilter ano={ano} mes={mes} onAnoChange={setAno} onMesChange={setMes} />

      {produto === 'UP' ? (
        <PerformanceTickerUP data={summaryData}
        />
      ) : (
        <PerformanceTicker data={summaryData}
        />
      )}

      {produto === 'UP' ? (
        <SummarySectionUP
          data={summaryData}
          loading={summaryLoading}
          error={summaryError}
        />
      ) : (
        <SummarySection
          data={summaryData}
          loading={summaryLoading}
          error={summaryError}
        />
      )}


      {produto === 'UP' ? (
        <IndicatorsSectionUP
          data={summaryData}
          loading={summaryLoading}
          error={summaryError}
        />
      ) : (
        <IndicatorsSection
          data={summaryData}
          loading={summaryLoading}
          error={summaryError}
        />
      )}

      <RankingSection ano={ano} mes={mes} />
    </div>
  );
}
