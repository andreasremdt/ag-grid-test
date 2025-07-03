"use client";

import type {
  ColDef,
  GetRowIdFunc,
  RowClassParams,
  RowSelectionOptions,
  SideBarDef,
} from "ag-grid-community";
import Table from "../table";
import { useAppContext } from "@/lib/app-context";
import { useParams, useRouter } from "next/navigation";
import styles from "./submission-table.module.css";
import columnDefs from "./column-defs";
import { Aggregate } from "./types";
import createContextSource from "./create-context-source";
import { useCallback } from "react";
import useDataSource from "./use-data-source";
import useEmptyState from "./use-empty-state";

type Props = {
  bookmarks?: string[];
};

const getRowId: GetRowIdFunc = ({ data }): string =>
  `${data.sub_id}.${data.rcp_ts}`;

const defaultColDef: ColDef = {
  enableRowGroup: true,
};

const tableActions = ["export"];

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

const tableKey = "cars";

function getRowErrorState({ data }: RowClassParams<Aggregate>) {
  if (data?.status === "355") return "failed";
  if (data?.status === "305") return "invalid";
}

export default function SubmissionTable({ bookmarks }: Props) {
  const { view } = useParams();
  const router = useRouter();
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
    updateBookmarks,
  } = useAppContext();

  const dataSource = useDataSource(bookmarks);
  const emptyState = useEmptyState(bookmarks);

  const carCustomViews = customViews.filter(
    (customView) => customView.type === tableKey
  );
  const activeCustomView = carCustomViews.find(
    (customView) => customView.id === view
  );

  const getSelectionOptions = useCallback((selection: object[]) => {
    return [
      {
        icon: "Download",
        title: `Download ${selection.length} submissions`,
        callback: () => console.log(`Download ${selection.length} submissions`),
      },
      {
        icon: "Bookmark",
        title: `Bookmark ${selection.length} submissions`,
        callback: () => updateBookmarks(selection),
      },
    ];
  }, []);

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
        liveUpdatesInterval={liveUpdates ? 3000 : undefined}
        onToggleLiveUpdates={toggleLiveUpdates}
        sideBar={sideBar}
        getRowId={getRowId}
        cacheBlockSize={30}
        rowSelection={rowSelection}
        columnHeaderFormat={columnHeadersInCode ? "code" : "text"}
        onToggleColumnHeaderFormat={toggleColumnHeadersInCode}
        quickFilter="Search submissions"
        enableAdvancedFilter
        customViewsQuickActions={customViewQuickActions}
        onToggleCustomViewsQuickActions={toggleCustomViewQuickActions}
        customViewsLayout={bookmarks ? "none" : "toolbar"}
        tableKey={tableKey}
        columnDefs={columnDefs}
        emptyState={emptyState}
        getRowErrorState={getRowErrorState}
        getSelectionOptions={getSelectionOptions}
        tableActions={tableActions}
      />
    </>
  );
}
