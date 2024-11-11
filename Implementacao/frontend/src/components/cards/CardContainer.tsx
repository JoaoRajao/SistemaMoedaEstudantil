import { ReactNode } from "react";
import { BaseCardProps, CardVariant } from "@/components/cards/types";

/** Props do CardContainer */
interface CardContainerProps extends BaseCardProps {
  /** Conteúdo do card */
  children: ReactNode;
  /** Variante de estilo */
  variant?: CardVariant;
}

export default function CardContainer({
  children,
  className = "",
  onClick,
  variant = "default",
}: CardContainerProps) {
  const variants = {
    default: "bg-gray-800 border-gray-700 hover:border-gray-600",
    dashboard: "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800",
    highlight: "bg-blue-900/20 border-blue-700/50 hover:border-blue-600",
  };

  return (
    <div
      onClick={onClick}
      className={`
        border rounded-lg shadow-lg p-4
        transition-all duration-200 ease-in-out
        ${variants[variant]}
        ${onClick ? "cursor-pointer transform hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
