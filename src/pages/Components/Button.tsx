import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultButtons from "../../components/form/form-elements/DefaultButtons";
import PageMeta from "../../components/common/PageMeta";

export default function Button() {
  return (
    <div>
      <PageMeta
        title="Ellty App"
        description="Button Components"
      />
      <PageBreadcrumb pageTitle="Buttons Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultButtons />
        </div>
      </div>
    </div>
  );
}
