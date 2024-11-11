interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

export default function DateField({
  label,
  error,
  className = "",
  ...props
}: DateFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type="date"
        className={`
          w-full px-4 py-2 bg-gray-800 border rounded-md
          ${error ? "border-red-500" : "border-gray-600"}
          focus:outline-none focus:ring-2 focus:ring-blue-500
          text-white
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
