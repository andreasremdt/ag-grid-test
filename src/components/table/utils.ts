import type { GridApi } from "ag-grid-community";
import type { CustomViewState } from "./types";

export function applyGridState(state: CustomViewState, api: GridApi | null) {
  api?.setGridOption("suppressColumnMoveAnimation", true);
  api?.setFilterModel(state.filterState);
  api?.applyColumnState({
    state: state.columnState,
    applyOrder: true,
  });
  api?.setGridOption("suppressColumnMoveAnimation", false);
}

export function resetGridState(api: GridApi | null) {
  api?.setGridOption("suppressColumnMoveAnimation", true);
  api?.setFilterModel(null);
  api?.resetColumnState();
  api?.resetColumnGroupState();
  api?.setGridOption("suppressColumnMoveAnimation", false);
}

export function getGridState(api: GridApi | null): CustomViewState {
  return {
    columnState: api?.getColumnState() || [],
    filterState: api?.getFilterModel() || {},
  };
}
