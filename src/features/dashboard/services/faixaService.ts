export function getProximaFaixaInfo(
  vendas: number,
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
export function getProximaFaixaUp(
  percentAtingido: number,
  rvAtual: number
) {
  const faixas = [
    { min: 0, max: 59.99, valor: 0 },
    { min: 60, max: 79.9, valor: 70 },
    { min: 80, max: 99, valor: 100 },
    { min: 100, max: 119, valor: 200 },
    { min: 120, max: 149, valor: 220 },
    { min: 150, max: 200, valor: 250 },
    { min: 201, max: 249, valor: 300 },
    { min: 250, max: Infinity, valor: 500 }
  ];

  // descobrir faixa atual
  const indexAtual = faixas.findIndex(
    faixa =>
      percentAtingido >= faixa.min &&
      percentAtingido <= faixa.max
  );

  // se já está na última faixa ou não encontrou
  if (indexAtual === -1 || indexAtual === faixas.length - 1) {
    return null;
  }

  const proxima = faixas[indexAtual + 1];

  const percentualNecessario = Number(
    (proxima.min - percentAtingido).toFixed(2)
  );

  const novoValorRV = proxima.valor;

  return {
    percentualNecessario,
    novaFaixaMinima: proxima.min,
    novoValorRV,
    diferencaValor: novoValorRV - rvAtual
  };
}
