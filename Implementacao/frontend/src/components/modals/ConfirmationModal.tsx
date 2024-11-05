// src/components/modals/ConfirmationModal.tsx
interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div
      role="alertdialog"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300"
    >
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white">
        <h2 id="confirm-modal-title" className="sr-only">
          Confirmação
        </h2>
        <p id="confirm-modal-description" className="mb-4">
          {message}
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
