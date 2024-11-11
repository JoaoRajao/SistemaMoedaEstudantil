import ModalContainer from "./ModalContainer";
import { BaseModalProps, buttonVariants } from "./types";

interface InfoModalProps extends BaseModalProps {
  /** Mensagem informativa */
  message: string;
  /** Texto do botão de fechar */
  closeText?: string;
}

export default function InfoModal({
  title = "Informação",
  message,
  onClose,
  isOpen,
  closeText = "Fechar",
}: InfoModalProps) {
  return (
    <ModalContainer title={title} isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`
              px-4 py-2 rounded transition-colors duration-200
              ${buttonVariants.primary}
            `}
          >
            {closeText}
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
