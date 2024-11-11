/** Props base para todos os modais */
export interface BaseModalProps {
  /** Título do modal */
  title?: string;
  /** Indica se o modal está aberto */
  isOpen: boolean;
  /** Função chamada ao fechar o modal */
  onClose: () => void;
  /** Classe CSS adicional */
  className?: string;
}

/** Props para botões do modal */
export interface ModalButtonProps {
  /** Texto do botão */
  label: string;
  /** Variante de estilo */
  variant?: "primary" | "secondary" | "danger";
  /** Função de clique */
  onClick: () => void;
  /** Classe CSS adicional */
  className?: string;
}

/** Estilos padrão para botões */
export const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-gray-300",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};
