import { useCallback, useContext, useEffect, useMemo } from "react";
import TableContext from "../lib/context";
import type { TableSettings } from "../lib/types";
import {
  ColDef,
  GridReadyEvent,
  RowClassParams,
  RowClassRules,
  RowSelectedEvent,
} from "ag-grid-community";
import styles from "../table.module.css";

function useTableState() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state, dispatch } = context;

  function setGridSettings(payload: Partial<TableSettings>) {
    dispatch({ type: "TOGGLE_TABLE_SETTING", payload });

    setTimeout(() => dispatch({ type: "SET_GRID_READY" }));
  }

  const rowClassRules = useMemo((): RowClassRules => {
    return {
      [styles["failed"]]: (params: RowClassParams) =>
        state.settings.highlightErrors &&
        state.tableProps.getRowErrorState?.(params) === "failed",
      [styles["invalid"]]: (params: RowClassParams) =>
        state.settings.highlightErrors &&
        state.tableProps.getRowErrorState?.(params) === "invalid",
      ...state.tableProps.rowClassRules,
    };
  }, [state.settings.highlightErrors, state.tableProps.rowClassRules]);

  const defaultColDef = useMemo(
    (): ColDef => ({
      editable: false,
      filterParams: {
        buttons: ["clear"],
      },
      headerValueGetter: ({ colDef }): string => {
        const { headerName, field } = colDef as ColDef;

        if (state.tableProps.columnHeaderFormat === "code") {
          return field || headerName || "";
        }

        return headerName || field || "";
      },
      ...state.tableProps.defaultColDef,
    }),
    [state.tableProps.columnHeaderFormat, state.tableProps.defaultColDef]
  );

  useEffect(() => {
    dispatch({ type: "DESTROY" });

    setTimeout(() => dispatch({ type: "SET_GRID_READY" }));
  }, [state.tableProps.columnHeaderFormat]);

  const onGridReady = useCallback(async ({ api }: GridReadyEvent) => {
    const context = await state.tableProps.contextSource?.get();

    api.setGridOption("context", {
      ...context,
      modifiedFields: [],
    });
    api.refreshCells();

    dispatch({ type: "INIT_GRID_API", payload: api });
  }, []);

  const onRowSelected = useCallback(({ api }: RowSelectedEvent) => {
    dispatch({ type: "SET_ROW_SELECTION", payload: api.getSelectedRows() });
  }, []);

  return {
    ...state,
    rowClassRules,
    defaultColDef,
    onGridReady,
    setGridSettings,
    onRowSelected,
  };
}

export default useTableState;
