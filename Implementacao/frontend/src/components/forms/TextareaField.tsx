interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function TextareaField({
  label,
  error,
  className = "",
  ...props
}: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <textarea
        className={`
          w-full px-4 py-2 bg-gray-800 border rounded-md
          ${error ? "border-red-500" : "border-gray-600"}
          focus:outline-none focus:ring-2 focus:ring-blue-500
          text-white placeholder-gray-400 resize-y min-h-[100px]
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
