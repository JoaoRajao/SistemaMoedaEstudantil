import CardContainer from "./CardContainer";

/** Propriedades do componente DashboardCard */
interface DashboardCardProps {
  /** Título do card */
  title: string;
  /** Valor principal */
  value: string | number;
  /** Ícone opcional */
  icon?: React.ReactNode;
  /** Informações de tendência */
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  /** Função de clique opcional */
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
  onClick,
}: DashboardCardProps) {
  return (
    <CardContainer variant="dashboard" onClick={onClick}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>

          {trend && (
            <p
              className={`text-sm mt-2 flex items-center
              ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>

        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </CardContainer>
  );
}
