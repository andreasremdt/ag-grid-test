import type { ColDef, RowClassParams } from "ag-grid-community";
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
  { field: "make", headerName: "Make", filter: true },
  { field: "model", headerName: "Model", filter: true },
  { field: "price", headerName: "Price", filter: true },
];

function getRowErrorState({ data }: RowClassParams<Computer>) {
  if (data?.make === "Apple") return "failed";
  if (data?.make === "HP") return "invalid";
}

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
      onCreateCustomView={onCreateCustomView}
      onDeleteCustomView={onDeleteCustomView}
      onSaveCustomView={onSaveCustomView}
      activeCustomView={activeCustomView}
      customViewsType={customViewsType}
      customViews={computerCustomViews}
      getRowErrorState={getRowErrorState}
      customViewsLayout="dropdown"
      rowData={rowData}
      columnDefs={columnDefs}
    />
  );
}
