import type { ColDef } from "ag-grid-community";
import Table from "../table";
import { useAppContext } from "@/lib/app-context";
import { useParams, useRouter } from "next/navigation";

type Car = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
};

const rowData: Car[] = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
];

const columnDefs: ColDef<Car>[] = [
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
];

const customViewsType = "cars";

export default function CarTable() {
  const { view } = useParams();
  const router = useRouter();
  const {
    customViews,
    onCreateCustomView,
    onSaveCustomView,
    onDeleteCustomView,
  } = useAppContext();

  const carCustomViews = customViews.filter(
    (customView) => customView.type === customViewsType
  );
  const activeCustomView = carCustomViews.find(
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
      customViews={carCustomViews}
      customViewsLayout="simple"
      heading="Cars"
      customViewsType="cars"
      rowData={rowData}
      columnDefs={columnDefs}
    />
  );
}
