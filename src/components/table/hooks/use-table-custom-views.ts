import { useCallback, useContext } from "react";
import TableContext from "../lib/context";
import type { StateUpdatedEvent } from "ag-grid-community";
import type { CustomView } from "../lib/types";
import deepEqual from "@/lib/deep-equal";

function isExcludedGridEvent(sources: string[]) {
  const excludedEvents = ["rowGroupExpansion", "rowSelection"];

  if (sources.length === 1) {
    return sources.every((value) => excludedEvents.includes(value));
  }

  return false;
}

function useTableCustomViews() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state, dispatch } = context;

  const onStateUpdated = useCallback(
    ({ sources, state: gridState }: StateUpdatedEvent) => {
      if (isExcludedGridEvent(sources)) {
        return;
      }
      console.log(state.customViews.initialState);
      if (sources.includes("gridInitializing")) {
        dispatch({ type: "INIT", payload: gridState });
      } else if (deepEqual(state.customViews.initialState, gridState)) {
        dispatch({ type: "RESET_MODIFIED_STATE" });
        setGridReady();
      } else {
        dispatch({ type: "UPDATE_CUSTOM_VIEW_STATE", payload: gridState });
        setGridReady();
      }
    },
    [state.customViews.initialState]
  );

  function resetGridState() {
    dispatch({ type: "RESET_MODIFIED_STATE" });
    setGridReady();
  }

  function setGridReady() {
    setTimeout(() => dispatch({ type: "SET_GRID_READY" }));
  }

  function switchCustomView(selectedCustomView?: CustomView) {
    if (selectedCustomView) {
      dispatch({ type: "SET_ACTIVE_CUSTOM_VIEW", payload: selectedCustomView });
    } else {
      dispatch({ type: "RESET_ALL" });
    }

    setGridReady();
  }

  function createCustomView(title: string) {
    if (!state.customViews.modifiedState) return;

    const newCustomView: CustomView = {
      id: Date.now().toString(),
      title,
      state: state.customViews.modifiedState,
      type: state.tableProps.customViewsType!,
    };

    state.tableProps.onCreateCustomView?.(newCustomView);
    dispatch({
      type: "SET_ACTIVE_CUSTOM_VIEW",
      payload: newCustomView,
    });
    setGridReady();
  }

  function saveCustomView() {
    const gridState = state.api?.getState();

    if (!state.customViews.activeView || !gridState) return;

    const savedCustomView: CustomView = {
      ...state.customViews.activeView,
      state: gridState,
    };

    state.tableProps.onSaveCustomView?.(savedCustomView);
    dispatch({
      type: "PERSIST_CUSTOM_VIEW_STATE",
      payload: gridState,
    });
    setGridReady();
  }

  function renameCustomView(renamedCustomView: CustomView) {
    state.tableProps.onSaveCustomView?.(renamedCustomView);

    if (state.customViews.activeView?.id === renamedCustomView.id) {
      dispatch({
        type: "UPDATE_ACTIVE_CUSTOM_VIEW",
        payload: renamedCustomView,
      });
    }
  }

  return {
    ...state,
    resetGridState,
    switchCustomView,
    createCustomView,
    saveCustomView,
    renameCustomView,
    onStateUpdated,
  };
}

export default useTableCustomViews;
