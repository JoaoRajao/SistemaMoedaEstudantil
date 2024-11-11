import { BaseCardProps } from "./types";
import Badge from "@/components/common/Badge";
import CardContainer from "./CardContainer";
import { formatters } from "@/utils/formatters";

/** Props do componente VantagemCard */
interface VantagemCardProps extends BaseCardProps {
  /** Nome da vantagem */
  nome: string;
  /** Descrição da vantagem */
  descricao: string;
  /** Custo em moedas */
  custo: number;
  /** Nome da empresa */
  empresa: string;
  /** Status de disponibilidade */
  disponivel: boolean;
}

export default function VantagemCard({
  nome,
  descricao,
  custo,
  empresa,
  disponivel,
  onClick,
  className,
}: VantagemCardProps) {
  return (
    <CardContainer onClick={onClick} className={className}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{nome}</h3>
          <Badge
            text={disponivel ? "Disponível" : "Indisponível"}
            variant={disponivel ? "success" : "info"}
          />
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">{descricao}</p>

        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
          <span className="text-sm text-gray-400">{empresa}</span>
          <span className="text-lg font-bold text-white">
            {formatters.moedas(custo)}
          </span>
        </div>
      </div>
    </CardContainer>
  );
}
