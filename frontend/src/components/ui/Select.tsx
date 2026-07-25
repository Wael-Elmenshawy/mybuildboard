import type {
  ReactNode,
  SelectHTMLAttributes,
} from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

function Select({
  label,
  children,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black ${className}`}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
