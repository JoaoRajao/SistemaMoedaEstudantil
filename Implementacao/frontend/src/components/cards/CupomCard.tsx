import { formatters } from "@/utils/formatters";
import { BaseCardProps } from "./types";
import CardContainer from "./CardContainer";
import Badge from "@/components/common/Badge";
import { CupomStatus } from "@/types/cupom";
import { Vantagem } from "@/types/vantagem";

interface CupomCardProps extends BaseCardProps {
  codigo: string;
  status: CupomStatus;
  dataResgate: string;
  dataValidade: string;
  vantagem: Vantagem;
}

const statusConfig = {
  DISPONIVEL: { text: "Disponível", variant: "success" as const },
  UTILIZADO: { text: "Utilizado", variant: "info" as const },
  EXPIRADO: { text: "Expirado", variant: "error" as const },
};

export default function CupomCard({
  codigo,
  status,
  dataResgate,
  dataValidade,
  vantagem,
  onClick,
  className,
}: CupomCardProps) {
  return (
    <CardContainer onClick={onClick} className={className}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {vantagem.nome}
            </h3>
            <p className="text-sm text-gray-400">{vantagem.empresa.nome}</p>
          </div>
          <Badge
            text={statusConfig[status].text}
            variant={statusConfig[status].variant}
          />
        </div>

        <div className="bg-gray-700/30 rounded p-3">
          <p className="text-sm text-gray-400 mb-1">Código do Cupom</p>
          <p className="text-lg font-mono font-semibold text-white">{codigo}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
          <div>
            <p className="text-xs text-gray-400">Data de Resgate</p>
            <p className="text-sm text-white">
              {formatters.date(new Date(dataResgate))}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Válido até</p>
            <p className="text-sm text-white">
              {formatters.date(new Date(dataValidade))}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
          <span className="text-sm text-gray-400">Valor</span>
          <span className="text-lg font-bold text-white">
            {formatters.moedas(vantagem.custo)}
          </span>
        </div>
      </div>
    </CardContainer>
  );
}
