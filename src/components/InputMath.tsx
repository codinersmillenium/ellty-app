import Input from "./form/input/InputField";

export interface InputMathProps {
  value: number;
  onChange?: (v: string) => void;
  max?: number;
  onSubmit?: () => void;
  placeholder?: string;
  height?: string;
  className?: string;
}

export function InputMath({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter starting number or right operand...",
  height = "h-28",
  className = "",
}: InputMathProps) {
  return (
    <div className={`bg-white ${height} rounded-2xl shadow-md border border-neutral-200 relative p-2 ${className}`}>
         <Input 
          type="number" 
          placeholder={placeholder}
          className="border-0 bg-transparent"
          value={value} // Mengikat nilai state
          onChange={(e: any) => onChange?.(e)} // Mengikat handler perubahan
        />

      <div className="flex gap-2 items-center absolute right-2 bottom-2">
        <button
          onClick={onSubmit}
          className="bg-neutral-700 rounded-full text-white w-8 h-8 p-2 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-4 h-4"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M112 244l144-144l144 144"
            ></path>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M256 120v292"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}