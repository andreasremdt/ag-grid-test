import type { ColDef } from "ag-grid-community";
import Table from "../table";
import { useAppContext } from "@/lib/app-context";
import { useParams, useRouter } from "next/navigation";

type Computer = {
  make: string;
  model: string;
  price: number;
};

const rowData: Computer[] = [
  { make: "Apple", model: "Macbook Air M4", price: 33850 },
  { make: "Apple", model: "Macbook Pro M3", price: 65433 },
  { make: "Dell", model: "XPS 13", price: 29600 },
];

const columnDefs: ColDef<Computer>[] = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
];

const customViewsType = "computers";

export default function ComputerTable() {
  const { view } = useParams();
  const router = useRouter();
  const {
    customViews,
    onCreateCustomView,
    onSaveCustomView,
    onDeleteCustomView,
  } = useAppContext();

  const computerCustomViews = customViews.filter(
    (customView) => customView.type === customViewsType
  );
  const activeCustomView = computerCustomViews.find(
    (customView) => customView.id === view
  );

  return (
    <Table
      onCreateCustomView={(newCustomView) => {
        onCreateCustomView(newCustomView);
        router.push(`/views/${newCustomView.id}`);
      }}
      onDeleteCustomView={(deletedCustomView) => {
        onDeleteCustomView(deletedCustomView);
        router.push("/");
      }}
      onSaveCustomView={onSaveCustomView}
      activeCustomView={activeCustomView}
      customViewsType={customViewsType}
      customViews={computerCustomViews}
      customViewsLayout="dropdown"
      heading="Computers"
      rowData={rowData}
      columnDefs={columnDefs}
    />
  );
}
