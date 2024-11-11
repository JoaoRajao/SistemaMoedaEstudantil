interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  title?: string;
  error?: string;
  success?: string;
}

export default function FormContainer({
  children,
  onSubmit,
  title,
  error,
  success,
}: FormContainerProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md"
    >
      {title && <h2 className="text-xl font-bold text-white mb-6">{title}</h2>}

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500">
          {success}
        </div>
      )}

      {children}
    </form>
  );
}
