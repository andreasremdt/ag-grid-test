import { useContext } from "react";
import TableContext from "./context";
import type {
  ColumnMovedEvent,
  ColumnResizedEvent,
  ColumnVisibleEvent,
  FilterChangedEvent,
  GridReadyEvent,
  SortChangedEvent,
} from "ag-grid-community";
import { compare } from "@/lib/utils";
import type { CustomView } from "./types";
import { applyGridState, getGridState, resetGridState } from "./utils";

type StateUpdatedEvent =
  | FilterChangedEvent
  | ColumnVisibleEvent
  | SortChangedEvent
  | ColumnMovedEvent
  | ColumnResizedEvent;

function useTableState(activeCustomView?: CustomView) {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state, dispatch } = context;

  function onInitGrid({ api }: GridReadyEvent) {
    const initialCustomViewState = activeCustomView?.state || getGridState(api);

    dispatch({
      type: "INIT",
      payload: { api, initialCustomViewState, activeCustomView },
    });

    if (activeCustomView) {
      applyGridState(activeCustomView.state, api);
    }
  }

  function onStateUpdated({ api, source }: StateUpdatedEvent) {
    if (source === "flex" || source === "api") {
      return;
    }

    const newState = getGridState(api);

    if (compare(state.initialCustomViewState, newState)) {
      dispatch({ type: "RESET_MODIFIED_STATE" });
    } else {
      dispatch({ type: "UPDATE_CUSTOM_VIEW", payload: newState });
    }
  }

  function onResetGridState() {
    if (state.activeCustomView) {
      applyGridState(state.activeCustomView.state, state.api);
    } else {
      resetGridState(state.api);
    }

    dispatch({ type: "RESET_MODIFIED_STATE" });
  }

  function onSwitchCustomView(selectedCustomView?: CustomView) {
    if (selectedCustomView) {
      applyGridState(selectedCustomView.state, state.api);
      dispatch({ type: "SET_ACTIVE_CUSTOM_VIEW", payload: selectedCustomView });
    } else {
      resetGridState(state.api);
      dispatch({ type: "RESET_MODIFIED_STATE" });
    }
  }

  return {
    state,
    dispatch,
    onInitGrid,
    onStateUpdated,
    onResetGridState,
    onSwitchCustomView,
  };
}

export default useTableState;
