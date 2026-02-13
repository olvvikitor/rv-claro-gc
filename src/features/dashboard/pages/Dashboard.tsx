import SummarySection from "../components/SummarySection";
import { useDashboard } from "../hook/useSummary";
const data = 
{  valorBruto: 2,
  desconto: 1,
  bonificacoes: 1,
  ultimaAtualizacao: 'dofnd'}

export default function DashboardPage() {
    return (
        <SummarySection data={data}/>
    );
}