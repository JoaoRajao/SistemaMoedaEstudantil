import { ReactNode } from "react";

/** Props base para componentes de feedback */
export interface BaseFeedbackProps {
  /** Mensagem principal */
  message: string;
  /** Mensagem secundária/descrição */
  description?: string;
  /** Classe CSS adicional */
  className?: string;
  /** Ícone personalizado */
  icon?: ReactNode;
}

/** Variantes de estilo disponíveis */
export type FeedbackVariant = "info" | "success" | "error" | "warning";

/** Estilos padrão para feedback */
export const feedbackVariants = {
  info: "bg-blue-500/10 border-blue-500 text-blue-500",
  success: "bg-green-500/10 border-green-500 text-green-500",
  error: "bg-red-500/10 border-red-500 text-red-500",
  warning: "bg-yellow-500/10 border-yellow-500 text-yellow-500",
};
