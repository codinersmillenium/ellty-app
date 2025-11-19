import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "default";
  bgColor?: string;
  variant?: "primary";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "default",
  variant = "primary",
  bgColor = "bg-warning-50",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  // Size Classes (mengikuti Figma height ±40px)
  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    default: "h-[40px] w-[340px]"
  };

  // Variant Classes (disesuaikan dari desain gambar)
  const variantClasses = {
    primary: `
      ${bgColor}
      text-[#1F2128] 
      rounded-[4px]
      transition 
      disabled:opacity-50 
      disabled:cursor-not-allowed
      font-normal
    `
  };

  return (
    <button
      className={`inline-flex justify-center align-items-center rounded-[4px] pt-[10px] pb-[20px] pl-[10px] pr-[20px] gap-[10px]
                  ${sizeClasses[size]} 
                  ${variantClasses[variant]} 
                  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;