"use client";

import { AgGridReact } from "ag-grid-react";
import theme from "./lib/theme";
import TableToolbar from "./table-toolbar";
import type { TableProps } from "./lib/types";
import useTableState from "./use-table-state";
import {
  AllEnterpriseModule,
  type ColDef,
  LicenseManager,
  ModuleRegistry,
  type RowClassParams,
  type RowClassRules,
} from "ag-grid-enterprise";
import { useMemo, useReducer } from "react";
import TableContext, { getInitialTableContextState } from "./lib/context";
import reducer from "./lib/reducer";
import styles from "./table.module.css";

ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE!);

function Table({ getRowErrorState, ...props }: TableProps) {
  const { state, onStateUpdated } = useTableState();

  const rowClassRules = useMemo((): RowClassRules => {
    return {
      [styles["failed"]]: (params: RowClassParams) =>
        state.settings.highlightErrors &&
        getRowErrorState?.(params) === "failed",
      [styles["invalid"]]: (params: RowClassParams) =>
        state.settings.highlightErrors &&
        getRowErrorState?.(params) === "invalid",
      ...props.rowClassRules,
    };
  }, [state.settings.highlightErrors, props.rowClassRules]);

  const defaultColDef = useMemo(
    (): ColDef => ({
      editable: false,
      filterParams: {
        buttons: ["clear"],
      },
      headerValueGetter: ({ colDef }): string => {
        const { headerName, field } = colDef as ColDef;

        if (state.settings.columnHeadersInCode) {
          return field || headerName || "";
        }

        return headerName || field || "";
      },
      ...props.defaultColDef,
    }),
    [state.settings.columnHeadersInCode, props.defaultColDef]
  );

  return (
    <div>
      <TableToolbar />

      {state.ready ? (
        <AgGridReact
          {...props}
          theme={theme}
          rowHeight={36}
          domLayout="autoHeight"
          suppressServerSideFullWidthLoadingRow
          suppressDragLeaveHidesColumns
          tooltipShowDelay={500}
          tooltipMouseTrack
          animateRows={false}
          defaultColDef={defaultColDef}
          onStateUpdated={onStateUpdated}
          initialState={state.customViewState}
          rowClassRules={rowClassRules}
          enableAdvancedFilter={state.settings.enableAdvancedFilter}
        />
      ) : (
        <p>Skeleton Loader</p>
      )}
    </div>
  );
}

function TableWrapper(tableProps: TableProps) {
  const [state, dispatch] = useReducer(
    reducer,
    getInitialTableContextState({
      activeCustomView: tableProps.activeCustomView,
      customViewState: tableProps.activeCustomView?.state,
      tableProps,
    })
  );

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      <Table {...tableProps} />
    </TableContext.Provider>
  );
}

export default TableWrapper;
