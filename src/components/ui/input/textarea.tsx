export interface TextareaProps {
  value: string;
  onChange?: (v: string) => void;
  max?: number;
  onSubmit?: () => void;
  placeholder?: string;
  height?: string;
  className?: string;
}

export function TextAreaInput({
  value,
  onChange,
  max = 4000,
  onSubmit,
  placeholder = "Post ...",
  height = "h-28",
  className = "",
}: TextareaProps) {
  return (
    <div className={`bg-white ${height} rounded-2xl shadow-md border border-neutral-200 relative ${className}`}>
      <div className="flex">
        <textarea
          className="grow m-4 outline-none min-h-16 resize-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          maxLength={max}
        />
      </div>

      <div className="flex gap-2 items-center absolute right-2 bottom-2">
        <div className="text-xs">{value.length}/{max}</div>
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