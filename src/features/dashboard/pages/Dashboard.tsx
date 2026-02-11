import { useResults } from "../hook/useResults";

export default function DashboardPage() {
    const {
        data, isLoading, error
    } = useResults()

    if(isLoading){
        return <p>Carregando dados...</p>
    }

    if(error){
        return <p>Erro ao carregar dados</p>
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <ul>
                {
                    data?.map((item:any)=>(
                        <li key={item.id}>
                            {item.name} - valor : {item.value}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}