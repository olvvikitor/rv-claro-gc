import { useState, useEffect } from "react";
import SummarySection from "../components/SummarySection";
import DateFilter from "../components/DateFilter";
import RankingSection from "../components/RankingSection";
import IndicatorsSection from "../components/IndicatorsSection";
import { useSummary } from "../hooks/useSummary";
import { PerformanceTicker } from "../components/Strip";

export default function DashboardPage() {
  const currentDate = new Date();

  const [ano, setAno] = useState(currentDate.getFullYear());
  const [mes, setMes] = useState(currentDate.getMonth() + 1);

  const { data: summaryData, loading: summaryLoading, error: summaryError, getSummary } = useSummary();

  useEffect(() => {
    getSummary(ano, mes);
  }, [ano, mes]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <DateFilter ano={ano} mes={mes} onAnoChange={setAno} onMesChange={setMes} />
      <PerformanceTicker data={summaryData}/>

      <SummarySection
        data={summaryData}
        loading={summaryLoading}
        error={summaryError}
      />

      <IndicatorsSection
        data={summaryData}
        loading={summaryLoading}
        error={summaryError}
      />

      <RankingSection ano={ano} mes={mes} />
    </div>
  );
}
