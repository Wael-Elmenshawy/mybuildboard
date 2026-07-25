import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full rounded-lg border px-4 py-3 outline-none ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-black"
        } ${className}`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
