import { useResults } from "../hook/useResults";
import { useDashboard } from "../hook/useSummary";

export default function DashboardPage() {
    const {
        data, isLoading, error
    } = useDashboard()

    if(isLoading){
        return <p>Carregando dados...</p>
    }
    if(error){
        return <p>Erro ao carregar dados</p>
    }
    return(
        <div>
            <h1>Dashboard</h1>

            <p>Valor bruto :R${data?.valorBruto}</p>

        </div>
    )
}