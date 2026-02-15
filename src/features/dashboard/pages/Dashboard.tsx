import { useState } from "react";
import SummarySection from "../components/SummarySection";
import DateFilter from "../components/DateFilter";
import RankingSection from "../components/RankingSection";

export default function DashboardPage() {
  const currentDate = new Date();

  const [ano, setAno] = useState(currentDate.getFullYear());
  const [mes, setMes] = useState(currentDate.getMonth() + 1);

  return (
    <div className="space-y-8">
      <DateFilter
        ano={ano}
        mes={mes}
        onAnoChange={setAno}
        onMesChange={setMes}
      />

      <SummarySection ano={ano} mes={mes} />
      <RankingSection ano={ano} mes={mes}/>
    </div>
  );
}
