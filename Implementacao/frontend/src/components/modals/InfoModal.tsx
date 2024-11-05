// src/components/modals/InfoModal.tsx
interface InfoModalProps {
  message: string;
  onClose: () => void;
}

export default function InfoModal({ message, onClose }: InfoModalProps) {
  return (
    <div
      role="dialog"
      aria-labelledby="info-modal-title"
      aria-describedby="info-modal-description"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300"
    >
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white">
        <h2 id="info-modal-title" className="sr-only">
          Informação
        </h2>
        <p id="info-modal-description" className="mb-4">
          {message}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
