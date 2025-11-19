import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import PageMeta from "../../components/common/PageMeta";

export default function CheckBoxList() {
  const items: any = [
    { id: 1, label: "All pages", checked: false },
    { id: 2, label: "Page 1", checked: false },
    { id: 3, label: "Page 2", checked: false },
    { id: 4, label: "Page 3", checked: false },
    { id: 5, label: "Page 4", checked: false },
  ];
  return (
    <div>
      <PageMeta
        title="Ellty App"
        description="Checkbox Components"
      />
      <PageBreadcrumb pageTitle="Checkbox" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <CheckboxComponents/>
        </div>
      </div>
    </div>
  );
}
