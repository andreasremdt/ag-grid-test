"use client";

import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import theme from "./lib/theme";
import TableToolbar from "./table-toolbar";
import type { CustomView } from "./lib/types";
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

type Props = AgGridReactProps & {
  customViewsType?: string;
  customViews?: CustomView[];
  customViewsLayout?: "none" | "simple" | "dropdown";
  activeCustomView?: CustomView;
  onCreateCustomView?: (customView: CustomView) => void;
  onSaveCustomView?: (customView: CustomView) => void;
  onDeleteCustomView?: (customView: CustomView) => void;
  getRowErrorState?: (data: RowClassParams) => "failed" | "invalid" | undefined;
};

ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE!);

function Table({
  customViewsType,
  customViews = [],
  activeCustomView,
  customViewsLayout = "none",
  onCreateCustomView,
  onSaveCustomView,
  onDeleteCustomView,
  getRowErrorState,
  ...props
}: Props) {
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
      <TableToolbar
        customViewsType={customViewsType}
        customViews={customViews}
        customViewsLayout={customViewsLayout}
        onCreateCustomView={onCreateCustomView}
        onSaveCustomView={onSaveCustomView}
        onDeleteCustomView={onDeleteCustomView}
      />

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

function TableWrapper(props: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    getInitialTableContextState({
      activeCustomView: props.activeCustomView,
      customViewState: props.activeCustomView?.state,
    })
  );

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      <Table {...props} />
    </TableContext.Provider>
  );
}

export default TableWrapper;
