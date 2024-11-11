import { InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function SearchInput({
  label,
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className={`
            block w-full pl-10 pr-3 py-2
            bg-gray-800 border border-gray-700 
            rounded-lg focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500
            text-white placeholder-gray-400
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
}
