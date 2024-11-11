import { BaseCardProps } from "./types";
import Badge from "@/components/common/Badge";
import CardContainer from "./CardContainer";
import { formatters } from "@/utils/formatters";

/** Props do componente TransacaoCard */
interface TransacaoCardProps extends BaseCardProps {
  /** Descrição da transação */
  descricao: string;
  /** Valor da transação */
  valor: number;
  /** Data da transação */
  data: string;
  /** Tipo da transação (Crédito/Débito) */
  tipo: "Crédito" | "Débito";
}

export default function TransacaoCard({
  descricao,
  valor,
  data,
  tipo,
  onClick,
  className,
}: TransacaoCardProps) {
  return (
    <CardContainer onClick={onClick} className={className}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{descricao}</h3>
          <Badge
            text={tipo}
            variant={tipo === "Crédito" ? "success" : "error"}
          />
        </div>

        <div className="flex justify-between items-end">
          <p className="text-2xl font-bold text-white">
            {formatters.currency(valor)}
          </p>
          <p className="text-sm text-gray-400">{formatters.date(data)}</p>
        </div>
      </div>
    </CardContainer>
  );
}
