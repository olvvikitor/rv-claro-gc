export function getProximaFaixaInfo(
  vendas: number,
  valorUnitarioAtual: number
) {
  const faixas = [
    { min: 0, max: 6, faixa: "<70%", valor: 5 },
    { min: 7, max: 9, faixa: ">=70%", valor: 10 },
    { min: 10, max: 19, faixa: ">=100%", valor: 20 },
    { min: 20, max: Infinity, faixa: ">=150%", valor: 25 }
  ];

  // descobrir faixa atual
  const indexAtual = faixas.findIndex(
    faixa => vendas >= faixa.min && vendas <= faixa.max
  );

  // se já está na última faixa, não há próxima
  if (indexAtual === -1 || indexAtual === faixas.length - 1) {
    return null;
  }

  const proxima = faixas[indexAtual + 1];

  const vendasNecessarias = proxima.min - vendas;
  const novoValorUnitario = proxima.valor;
  const novoBruto = vendas * novoValorUnitario;

  return {
    vendasNecessarias,
    novaFaixa: proxima.faixa,
    novoValorUnitario,
    novoBruto
  };
}
