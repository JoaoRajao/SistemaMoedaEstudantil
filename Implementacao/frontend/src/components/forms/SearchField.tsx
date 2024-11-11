interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  onSearch: (value: string) => void;
}

export default function SearchField({
  label,
  error,
  onSearch,
  className = "",
  ...props
}: SearchFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="search"
          className={`
            w-full pl-10 pr-4 py-2 bg-gray-800 border rounded-md
            ${error ? "border-red-500" : "border-gray-600"}
            focus:outline-none focus:ring-2 focus:ring-blue-500
            text-white placeholder-gray-400
            ${className}
          `}
          onChange={handleChange}
          {...props}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
