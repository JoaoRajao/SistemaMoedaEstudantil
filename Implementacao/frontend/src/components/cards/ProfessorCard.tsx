import CardContainer from "./CardContainer";
import { formatters } from "@/utils/formatters";

interface ProfessorCardProps {
  name: string;
  discipline: string;
  institution: string;
  cpf?: string;
  rg?: string;
  address?: string;
  salary?: string;
  onClick?: () => void;
}

export default function ProfessorCard({
  name,
  discipline,
  institution,
  cpf,
  rg,
  address,
  salary,
  onClick,
}: ProfessorCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{discipline}</p>
          </div>
          <span className="px-2 py-1 rounded text-sm font-medium bg-purple-500/10 text-purple-500">
            {institution}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
          {cpf && (
            <p className="flex items-center gap-2">
              <span className="font-medium">CPF:</span> {cpf}
            </p>
          )}
          {rg && (
            <p className="flex items-center gap-2">
              <span className="font-medium">RG:</span> {rg}
            </p>
          )}
          {address && (
            <p className="col-span-2 flex items-center gap-2">
              <span className="font-medium">Endereço:</span> {address}
            </p>
          )}
          {salary && (
            <p className="col-span-2 flex items-center gap-2 pt-2 border-t border-gray-700">
              <span className="font-medium">Salário:</span>
              <span className="text-white">
                {formatters.currency(Number(salary))}
              </span>
            </p>
          )}
        </div>
      </div>
    </CardContainer>
  );
}
