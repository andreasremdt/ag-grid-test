"use client";

import type {
  ColDef,
  GetRowIdFunc,
  RowClassParams,
  RowSelectionOptions,
  SideBarDef,
} from "ag-grid-community";
import Table, { createFetcher } from "../table";
import { useAppContext } from "@/lib/app-context";
import { useParams, useRouter } from "next/navigation";
import styles from "./submission-table.module.css";
import columnDefs from "./column-defs";
import createDatasource from "./create-datasource";
import { Aggregate } from "./types";
import createContextSource from "./create-context-source";

const dataSource = createDatasource(createFetcher("/events/aggregates"));

const getRowId: GetRowIdFunc = ({ data }): string =>
  `${data.sub_id}.${data.rcp_ts}`;

const defaultColDef: ColDef = {
  enableRowGroup: true,
};

const getSelectionOptions = (selection: object[]) => [
  {
    icon: "Download",
    title: `Download ${selection.length} submissions`,
    callback: () => console.log(`Download ${selection.length} submissions`),
  },
  {
    icon: "Bookmark",
    title: `Bookmark ${selection.length} submissions`,
    callback: () => console.log(`Bookmark ${selection.length} submissions`),
  },
];

const getTableActions = () => [
  {
    icon: "Download",
    title: `Download`,
    callback: () => console.log(`Download all submissions`),
  },
];

const contextSource = createContextSource();

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
  enableClickSelection: false,
};

const sideBar: SideBarDef = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
      toolPanelParams: {
        suppressPivotMode: true,
        suppressValues: true,
        suppressRowGroups: true,
      },
    },
    {
      id: "filters",
      labelDefault: "Filters",
      labelKey: "filters",
      iconKey: "filter",
      toolPanel: "agFiltersToolPanel",
    },
  ],
};

const customViewsType = "cars";

function getRowErrorState({ data }: RowClassParams<Aggregate>) {
  if (data?.status === "355") return "failed";
  if (data?.status === "305") return "invalid";
}

export default function SubmissionTable() {
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
    <>
      <h1 className={styles.title}>
        {activeCustomView?.title || "Submissions"}
      </h1>

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
        rowModelType="serverSide"
        serverSideDatasource={dataSource}
        contextSource={contextSource}
        rowGroupPanelShow="always"
        customViews={carCustomViews}
        defaultColDef={defaultColDef}
        refreshInterval={30000}
        sideBar={sideBar}
        getRowId={getRowId}
        cacheBlockSize={30}
        rowSelection={rowSelection}
        quickFilter="Search submissions"
        enableAdvancedFilter
        customViewsLayout="simple"
        customViewsType="cars"
        columnDefs={columnDefs}
        getRowErrorState={getRowErrorState}
        getSelectionOptions={getSelectionOptions}
        getTableActions={getTableActions}
      />
    </>
  );
}
