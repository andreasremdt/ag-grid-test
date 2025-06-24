import { useContext } from "react";
import TableContext from "./lib/context";
import type { StateUpdatedEvent } from "ag-grid-community";
import type { CustomView, TableSettings } from "./lib/types";
import deepEqual from "@/lib/deep-equal";

function useTableState() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state, dispatch } = context;

  function onStateUpdated(event: StateUpdatedEvent) {
    if (event.sources.includes("gridInitializing")) {
      dispatch({
        type: "INIT",
        payload: { api: event.api, initialCustomViewState: event.state },
      });
    } else if (deepEqual(state.initialCustomViewState, event.state)) {
      dispatch({ type: "RESET_MODIFIED_STATE" });
      setGridReady();
    } else {
      dispatch({ type: "UPDATE_CUSTOM_VIEW_STATE", payload: event.state });
      setGridReady();
    }
  }

  function resetGridState() {
    dispatch({ type: "RESET_MODIFIED_STATE" });
    setGridReady();
  }

  function setGridReady() {
    setTimeout(() => dispatch({ type: "SET_GRID_READY" }));
  }

  /**
   * Updates one or more grid settings, such as live updates, or advanced filters. The grid will
   * be re-rendered after the settings are applied.
   *
   * @param payload
   */
  function setGridSettings(payload: Partial<TableSettings>) {
    dispatch({ type: "TOGGLE_TABLE_SETTING", payload });
    setGridReady();
  }

  function switchCustomView(selectedCustomView?: CustomView) {
    if (selectedCustomView) {
      dispatch({ type: "SET_ACTIVE_CUSTOM_VIEW", payload: selectedCustomView });
    } else {
      dispatch({ type: "RESET_ALL" });
    }

    setGridReady();
  }

  return {
    state,
    dispatch,
    setGridReady,
    setGridSettings,
    resetGridState,
    switchCustomView,
    onStateUpdated,
  };
}

export default useTableState;
