import React from "react";
import { XCircle, TrendingUp, AlertTriangle, Percent } from "lucide-react";

interface RemuneracaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RemuneracaoModal: React.FC<RemuneracaoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6 dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white flex items-center gap-2">
            <TrendingUp className="text-green-600" size={22} />
            Como é calculada a Remuneração Variável
          </h2>
          <button onClick={onClose}>
            <XCircle className="text-gray-500 hover:text-red-500 transition" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300">

          {/* Regra principal */}
          <section>
            <h3 className="font-semibold text-base mb-2 dark:text-white">
              📌 Regra Principal
            </h3>
            <p>
              A remuneração variável é calculada com base na quantidade de
              vendas ativadas (instaladas) multiplicado pelo valor unitário
              conforme a faixa de meta atingida no mês.
            </p>
            <p className="mt-2">
              O pagamento é apurado no mês seguinte ao trabalhado.
              <br />
              Exemplo:
              <br />
              Fevereiro → Trabalhado  
              <br />
              Março → Apurado  
              <br />
              Abril → Pagamento
            </p>
          </section>

          {/* Faixas */}
          <section>
            <h3 className="font-semibold text-base mb-2 dark:text-white">
              💰 Faixa de Valor Unitário
            </h3>
            <p>
              O valor por venda aumenta conforme o operador atinge novas
              faixas de meta.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mt-3 space-y-2">
              <p>• 9 vendas → R$ 10,00 por venda = R$ 90,00</p>
              <p>
                • 10 vendas → muda de faixa → R$ 20,00 por venda = R$ 200,00
              </p>
              <p>• 11 vendas → R$ 220,00</p>
              <p>• 20 vendas → R$ 25,00 por venda</p>
            </div>

            <p className="mt-2 font-medium text-green-600">
              Quem vende mais, ganha mais!
            </p>
          </section>

          {/* Bonus */}
          <section>
            <h3 className="font-semibold text-base mb-2 dark:text-white flex items-center gap-2">
              <Percent size={18} className="text-blue-500" />
              Bônus Extra
            </h3>

            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 p-4 rounded-xl">
              Operadores com até 30% de quebra de agenda recebem
              <span className="font-bold text-blue-600"> +20% sobre o valor total da RV</span>.
            </div>
          </section>

          {/* Deflatores */}
          <section>
            <h3 className="font-semibold text-base mb-2 dark:text-white flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              Deflatores (Descontos)
            </h3>

            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-4 rounded-xl space-y-2">
              <p>• ABS</p>
              <p>• Casos críticos (Auditoria, Ouvidoria, Churn, Qualidade)</p>
              <p className="text-xs opacity-70">
                Indicadores não atingidos serão descontados do valor final.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RemuneracaoModal;
