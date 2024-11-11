import { ReactNode } from "react";

/** Props base para componentes comuns */
export interface BaseCommonProps {
  /** Classe CSS adicional */
  className?: string;
}

/** Props para inputs */
export interface BaseInputProps extends BaseCommonProps {
  /** Label do input */
  label: string;
  /** Placeholder do input */
  placeholder?: string;
  /** Mensagem de erro */
  error?: string;
  /** Mensagem de ajuda */
  helperText?: string;
  /** Indica se é obrigatório */
  required?: boolean;
  /** Indica se está desabilitado */
  disabled?: boolean;
  /** Ícone à esquerda */
  leftIcon?: ReactNode;
  /** Ícone à direita */
  rightIcon?: ReactNode;
}

/** Props para Avatar */
export interface AvatarProps extends BaseCommonProps {
  /** URL da imagem */
  src?: string;
  /** Texto alternativo */
  alt: string;
  /** Nome para fallback */
  name: string;
  /** Tamanho do avatar */
  size?: "sm" | "md" | "lg";
}

/** Props para Tooltip */
export interface TooltipProps extends BaseCommonProps {
  /** Conteúdo do tooltip */
  content: string;
  /** Elemento filho que receberá o tooltip */
  children: ReactNode;
  /** Posição do tooltip */
  position?: "top" | "right" | "bottom" | "left";
  /** Delay para mostrar (ms) */
  delay?: number;
}

/** Props para Breadcrumb */
export interface BreadcrumbProps extends BaseCommonProps {
  /** Items do breadcrumb */
  items: {
    label: string;
    href?: string;
  }[];
}

/** Props para Badge */
export interface BadgeProps extends BaseCommonProps {
  /** Texto do badge */
  text: string;
  /** Variante de cor */
  variant: BadgeVariant;
  /** Ícone opcional */
  icon?: ReactNode;
  /** Tamanho do badge */
  size?: "sm" | "md" | "lg";
}

/** Variantes de cor disponíveis */
export type BadgeVariant =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "purple"
  | "blue";

/** Estilos padrão para badges */
export const badgeVariants: Record<BadgeVariant, string> = {
  success: "bg-green-500/10 text-green-500 border-green-500/20",
  error: "bg-red-500/10 text-red-500 border-red-500/20",
  info: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};
