import ComponentCard from "../../common/ComponentCard.tsx";
import Button from "../../ui/button/Button.tsx";

export default function DefaultButtons() {

  const button = ["bg-warning-50", "bg-warning-25", "bg-warning-50"]
  return (
    <ComponentCard title="Default Buttons">
      {button.map((i) => (
        <div className="space-y-6">
          <Button children={(
            'Done'
          )} bgColor={i}/>
        </div>
      ))}
    </ComponentCard>
  );
}
