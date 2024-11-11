import CardContainer from "./CardContainer";
import { formatters } from "@/utils/formatters";

interface AlunoCardProps {
  name: string;
  course: string;
  institution: string;
  email?: string;
  saldoMoedas?: number;
  onClick?: () => void;
}

export default function AlunoCard({
  name,
  course,
  institution,
  email,
  saldoMoedas,
  onClick,
}: AlunoCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-gray-300">{course}</p>
        <p className="text-gray-400 text-sm">{institution}</p>

        {email && (
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {email}
          </p>
        )}

        {saldoMoedas !== undefined && (
          <div className="mt-3 pt-2 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Saldo disponível:
              <span className="ml-2 text-lg font-bold text-white">
                {formatters.moedas(saldoMoedas)}
              </span>
            </p>
          </div>
        )}
      </div>
    </CardContainer>
  );
}
