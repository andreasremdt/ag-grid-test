import { useContext, useMemo } from "react";
import TableContext from "../lib/context";
import type { TableSettings } from "../lib/types";
import { ColDef, RowClassParams, RowClassRules } from "ag-grid-community";
import styles from "../table.module.css";

function useTableState() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state, dispatch } = context;

  /**
   * Updates one or more grid settings, such as live updates, or advanced filters. The grid will
   * be re-rendered after the settings are applied.
   *
   * @param payload
   */
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

        if (state.settings.columnHeadersInCode) {
          return field || headerName || "";
        }

        return headerName || field || "";
      },
      ...state.tableProps.defaultColDef,
    }),
    [state.settings.columnHeadersInCode, state.tableProps.defaultColDef]
  );

  return {
    ...state,
    setGridSettings,
    rowClassRules,
    defaultColDef,
  };
}

export default useTableState;
