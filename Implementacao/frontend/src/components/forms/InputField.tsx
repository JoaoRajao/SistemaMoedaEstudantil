import React, { useState } from "react";
import { formatters } from "@/utils/formatters";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  mask?: "cpf" | "cnpj" | "currency" | "phone" | "date";
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export default function InputField({
  label,
  error,
  icon,
  mask,
  helperText,
  required = false,
  fullWidth = true,
  className = "",
  value = "",
  onChange,
  onBlur,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (mask) {
      switch (mask) {
        case "cpf":
          newValue = formatters.cpf(newValue.replace(/\D/g, ""));
          break;
        case "cnpj":
          newValue = formatters.cnpj(newValue.replace(/\D/g, ""));
          break;
        case "currency":
          // Remove caracteres não numéricos e converte para número
          const numericValue = Number(newValue.replace(/\D/g, "")) / 100;
          newValue = formatters.currency(numericValue);
          break;
        case "phone":
          newValue = newValue
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .substring(0, 15);
          break;
        case "date":
          newValue = newValue
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .substring(0, 10);
          break;
      }
    }

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };

    onChange?.(syntheticEvent);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : "w-auto"}`}>
      <label className="flex items-center text-sm font-medium text-gray-200 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`
            w-full px-4 py-2 bg-gray-800 border rounded-md transition-all
            ${icon ? "pl-10" : "pl-4"}
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : isFocused
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-gray-600 hover:border-gray-500"
            }
            focus:outline-none focus:ring-2
            text-white placeholder-gray-400
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={`${props.id || props.name}-error`}
          {...props}
        />

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p
          id={`${props.id || props.name}-error`}
          className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-400"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
