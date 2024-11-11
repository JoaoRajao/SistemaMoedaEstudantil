interface NumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

export default function NumberField({
  label,
  error,
  prefix,
  suffix,
  className = "",
  ...props
}: NumberFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          className={`
            w-full px-4 py-2 bg-gray-800 border rounded-md
            ${error ? "border-red-500" : "border-gray-600"}
            ${prefix ? "pl-8" : ""}
            ${suffix ? "pr-8" : ""}
            focus:outline-none focus:ring-2 focus:ring-blue-500
            text-white placeholder-gray-400
            ${className}
          `}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
