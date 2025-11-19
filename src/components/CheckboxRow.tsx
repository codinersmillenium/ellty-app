import Checkbox from "./ui/checkbox/Checkbox";

interface Props {
  label: string;
  checked: boolean;
  variant?: any;
  onToggle?: () => void;
}

export default function CheckboxRow({ label, checked, variant, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between p-6 h-[42px] bg-white">
      <span className="text-gray-700 text-sm">{label}</span>
      <Checkbox checked={checked} onChange={onToggle} variant={variant}/>
    </div>
  );
}
