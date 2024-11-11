import { ButtonHTMLAttributes } from "react";

/** Variantes de estilo disponíveis para botões */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning";

/** Props base para todos os botões */
export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante de estilo */
  variant?: ButtonVariant;
  /** Indica se está carregando */
  isLoading?: boolean;
  /** Texto do botão */
  children: React.ReactNode;
  /** Classe CSS adicional */
  className?: string;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Ícone à direita */
  rightIcon?: React.ReactNode;
}

/** Estilos padrão para botões */
export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-gray-300",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
};

/** Estilos base compartilhados */
export const baseButtonStyles = `
  px-4 py-2 rounded
  font-medium
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
`;
