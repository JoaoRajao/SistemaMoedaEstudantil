// src/components/forms/InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
        className={`w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? "border-red-500 bg-red-50 text-red-900"
            : "border-gray-700 bg-gray-800 text-white"
        }`}
      />
      {error && (
        <p
          id={`${name}-error`}
          className="text-red-500 text-sm mt-1"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
