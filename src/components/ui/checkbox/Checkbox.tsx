import type React from "react";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?:
    | "default"
    | "primary"
    | "primary-dark"
    | "primary-darker"
    | "primary-outline"
    | "warning"
    | "soft"
    | "disabled-checked"
    | "disabled-unchecked"
    | "plain";
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  id,
  onChange,
  className = "",
  disabled = false,
  variant = "default",
}) => {

  const variantClasses: Record<string, string> = {
    "default":
      "border-gray-400 bg-white",
    "primary":
      "bg-blue-500 border-blue-500",
    "primary-dark":
      "bg-blue-600 border-blue-600",
    "primary-darker":
      "bg-blue-700 border-blue-700",
    "primary-outline":
      "bg-blue-500 border-blue-300 shadow-[0_0_0_4px_rgba(0,102,255,0.25)]",
    "warning":
      "bg-yellow-300 border-yellow-400",
    "soft":
      "bg-gray-100 border-gray-300",
    "disabled-checked":
      "bg-white border-gray-200",
    "disabled-unchecked":
      "bg-white border-gray-300",
    "plain":
      "bg-white border-gray-200",
  };
  const checkColorMap: Record<string, string> = {
    "default": "black",
    "disabled-checked": "#E4E7EC",
    "warning": "white",
    "soft": "white",
    "primary": "white",
    "primary-dark": "white",
    "primary-darker": "white",
    "primary-outline": "white",
    "plain": "black",
  };

  const checkColor = checkColorMap[variant] ?? "white";
  const [isCheck, setCheck] = useState<boolean>(checked)
  let isChecked = onChange ? checked : isCheck;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.checked;
    if (onChange) {
      onChange?.(target);
    } else {
      setCheck(target);
    }
  }

  return (
    <label
      className={`flex items-center space-x-3 group cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      <div className="relative w-6 h-6">
        <input
          id={id}
          type="checkbox"
          className={`w-6 h-6 appearance-none cursor-pointer border rounded-md transition
          ${isChecked ? variantClasses[variant] : "bg-transparent"} 
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${className}`}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
        />

        {/* Checkmark */}
        {isChecked && (
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke={checkColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {label && (
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;