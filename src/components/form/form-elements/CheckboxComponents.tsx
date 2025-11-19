import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Checkbox from "../../ui/checkbox/Checkbox";

export default function CheckboxComponents() {
  const listCheckbox: any = [
    { variant: "default", checked: false},
    { variant: "warning", checked: true},
    { variant: "soft", checked: true},
    { variant: "primary", checked: true},
    { variant: "primary-dark", checked: true},
    { variant: "primary-darker", checked: true},
    { variant: "primary-outline", checked: true},
    { variant: "disabled-checked", checked: true, disabled: true},
    { variant: "disabled-unchecked", checked: false, disabled: true},
    { variant: "plain", checked: false},
  ]
  const [listChecked, _setIsChecked] = useState(listCheckbox);
  return (
    <ComponentCard title="Checkbox">
      <div className="flex items-center gap-4">
        {listChecked.map((i: any) => (
          <Checkbox 
            checked={i.checked} 
            variant={i.variant} 
            disabled={i?.disabled}
          />
        ))}
      </div>
    </ComponentCard>
  );
}
