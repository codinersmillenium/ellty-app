import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useState } from "react";
import CheckboxRow from "../../components/CheckboxRow";
import Button from "../../components/ui/button/Button";

export default function FirstTest() {
  const [allPage, setAllPage] = useState(false);
  const [pages, setPages] = useState([
    { label: "Page 1", checked: false, variant: "primary-dark" },
    { label: "Page 2", checked: false, variant: "primary-darker" },
    { label: "Page 3", checked: false, variant: "primary-outline" },
    { label: "Page 4", checked: false, variant: "warning" },
  ]);

  const togglePage = (index: number) => {
    const updated = [...pages];
    updated[index].checked = !updated[index].checked;
    setPages(updated);    
  };

  const handleAllPage = () => {
    const newValue = !allPage;
    setAllPage(newValue);

    setPages(prev =>
      prev.map(page => ({
        ...page,
        checked: newValue
      }))
    );
  };

  return (
    <>
      <PageMeta
        title="First Test Assignment"
        description="Evaluating attentiveness and accuracy through task execution"
      />
      <ComponentCard title="First Test Assignment">
         <div className="flex justify-center">
          <div className="w-[370px] h-[326px] bg-white shadow-md rounded-[6px] border border-1 overflow-hidden">
            <div className="mt-2">
              <CheckboxRow
                label="All pages"
                checked={allPage}
                onToggle={handleAllPage}
              />
            </div>
            <div className="px-6">
              <div className="border-t border-[0.7px] border-[#CDCDCD]"></div>
            </div>
          {pages.map((item, i) => (
            <CheckboxRow
              key={i}
              label={item.label}
              variant={item.variant}
              checked={item.checked}
              onToggle={() => togglePage(i)}
            />
          ))}
          <div className="px-6 mt-1">
            <div className="border-t border-[0.7px] border-[#CDCDCD]"></div>
          </div>
          <div className="p-4">
            <Button children={(
              'Done'
            )} bgColor="bg-warning-50"/>
          </div>
      </div>
      </div>
    </ComponentCard>
    </>
  );
}
