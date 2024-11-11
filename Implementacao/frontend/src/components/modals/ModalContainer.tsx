import { BaseModalProps } from "./types";

/** Props do ModalContainer */
interface ModalContainerProps extends BaseModalProps {
  /** Conteúdo do modal */
  children: React.ReactNode;
}

export default function ModalContainer({
  title,
  isOpen,
  onClose,
  children,
  className = "",
}: ModalContainerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`
          bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4
          transform transition-all duration-200
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
