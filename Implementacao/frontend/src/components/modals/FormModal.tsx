import ModalContainer from "./ModalContainer";
import { BaseModalProps, buttonVariants } from "./types";
import FormContainer from "../forms/FormContainer";

interface FormModalProps extends BaseModalProps {
  /** Título do formulário */
  formTitle?: string;
  /** Conteúdo do formulário */
  children: React.ReactNode;
  /** Função chamada ao submeter */
  onSubmit: (e: React.FormEvent) => void;
  /** Texto do botão de submissão */
  submitText?: string;
  /** Texto do botão de cancelamento */
  cancelText?: string;
  /** Mensagem de erro */
  error?: string;
  /** Mensagem de sucesso */
  success?: string;
}

export default function FormModal({
  title = "Formulário",
  formTitle,
  children,
  onSubmit,
  onClose,
  isOpen,
  submitText = "Salvar",
  cancelText = "Cancelar",
  error,
  success,
}: FormModalProps) {
  return (
    <ModalContainer title={title} isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <FormContainer
          title={formTitle}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          error={error}
          success={success}
        >
          {children}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`
                px-4 py-2 rounded transition-colors duration-200
                ${buttonVariants.secondary}
              `}
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className={`
                px-4 py-2 rounded transition-colors duration-200
                ${buttonVariants.primary}
              `}
            >
              {submitText}
            </button>
          </div>
        </FormContainer>
      </div>
    </ModalContainer>
  );
}
