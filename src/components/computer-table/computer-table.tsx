"use client";

import type { ColDef, RowClassParams } from "ag-grid-community";
import Table, { CustomView } from "../table";
import { useAppContext } from "@/lib/app-context";

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

const tableKey = "computers";
const localStorageKey = `test.custom-views.${tableKey}.last-active`;

export default function ComputerTable() {
  const {
    customViews,
    toggleColumnHeadersInCode,
    columnHeadersInCode,
    liveUpdates,
    customViewQuickActions,
    toggleCustomViewQuickActions,
    toggleLiveUpdates,
    onCreateCustomView,
    onSaveCustomView,
    onDeleteCustomView,
  } = useAppContext();

  const computerCustomViews = customViews.filter(
    (customView) => customView.type === tableKey
  );
  const activeCustomView = computerCustomViews.find(
    (customView) => customView.id === localStorage.getItem(localStorageKey)
  );

  function onSelectCustomView(customView?: CustomView) {
    if (customView) {
      localStorage.setItem(localStorageKey, customView.id);
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }

  return (
    <Table
      onCreateCustomView={onCreateCustomView}
      onDeleteCustomView={onDeleteCustomView}
      onSaveCustomView={onSaveCustomView}
      onSelectCustomView={onSelectCustomView}
      activeCustomView={activeCustomView}
      tableKey={tableKey}
      customViews={computerCustomViews}
      getRowErrorState={getRowErrorState}
      customViewsLayout="menu"
      liveUpdatesInterval={liveUpdates ? 3000 : undefined}
      onToggleLiveUpdates={toggleLiveUpdates}
      customViewsQuickActions={customViewQuickActions}
      onToggleCustomViewsQuickActions={toggleCustomViewQuickActions}
      columnHeaderFormat={columnHeadersInCode ? "code" : "text"}
      onToggleColumnHeaderFormat={toggleColumnHeadersInCode}
      rowData={rowData}
      columnDefs={columnDefs}
    />
  );
}
