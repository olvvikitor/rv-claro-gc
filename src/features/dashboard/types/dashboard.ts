export interface SummaryData {
    operador: {
        matricula: string;
        nome: string;
        supervisor: string;
        coordenador: string;
    };
    competencia: string;
    dados: {
        vendasRealizadas: number;
        valorUnitarioAplicado: number;
        rvBase: number;
        bonusValor: number;
        descontoDeflatores: number;
        descontoFaltasValor: number;
        rvFinal: number;
        createdAt: string;
        absPercentual: number;
        erroCriticoQtd: number;
        erroCriticoPercent: number;
        quebraAgendaPercent?: number;
    };
}

export interface RankingItem {
    operador: {
        matricula: string;
        nome: string;
    };
    rvFinal: number;
}

export interface Result {
    id: number;
    matricula: number;
    loginCallflex: number;
    login: string;
    vendedor: string;
    supervisor: string;
    coordenador: string;
    status: string;
    campanha: string;
    filaAtual: string;
    foco1: string;
    foco2: string;
    absTotal: number;
    erroCritico: number;
    ouvidoria: number;
    monitorias: number;
    metaQtd: number;
    realizadoQtd: number;
}

export interface DashboardSummary {
    valorBruto: number;
    desconto: number;
    bonificacoes: number;
    totalReceber: number;
    ultimaAtualizacao: string;
}
