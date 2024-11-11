import CardContainer from "./CardContainer";

interface EmpresaCardProps {
  name: string;
  cnpj: string;
  address: string;
  sector: string;
  onClick?: () => void;
}

export default function EmpresaCard({
  name,
  cnpj,
  address,
  sector,
  onClick,
}: EmpresaCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <span className="px-2 py-1 rounded text-sm font-medium bg-blue-500/10 text-blue-500">
            {sector}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400 flex items-center gap-2">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {address}
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-2">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {cnpj}
          </p>
        </div>
      </div>
    </CardContainer>
  );
}
