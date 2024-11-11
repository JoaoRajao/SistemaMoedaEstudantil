import ModalContainer from "./ModalContainer";
import { BaseModalProps, buttonVariants } from "./types";

interface ConfirmationModalProps extends BaseModalProps {
  /** Mensagem de confirmação */
  message: string;
  /** Função chamada ao confirmar */
  onConfirm: () => void;
  /** Texto do botão de confirmação */
  confirmText?: string;
  /** Texto do botão de cancelamento */
  cancelText?: string;
}

export default function ConfirmationModal({
  title = "Confirmação",
  message,
  onConfirm,
  onClose,
  isOpen,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmationModalProps) {
  return (
    <ModalContainer title={title} isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`
              px-4 py-2 rounded transition-colors duration-200
              ${buttonVariants.secondary}
            `}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`
              px-4 py-2 rounded transition-colors duration-200
              ${buttonVariants.primary}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
