import { ReactNode } from "react";

/** Props base para todos os cards */
export interface BaseCardProps {
  /** Classe CSS adicional */
  className?: string;
  /** Função de clique */
  onClick?: () => void;
}

/** Variantes de estilo disponíveis */
export type CardVariant = "default" | "dashboard" | "highlight";
