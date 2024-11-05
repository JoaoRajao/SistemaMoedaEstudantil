// src/components/forms/SelectField.tsx
interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export default function SelectField({
  label,
  options,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${label}-error`}
        className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded mt-1"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-gray-900 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${label}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
