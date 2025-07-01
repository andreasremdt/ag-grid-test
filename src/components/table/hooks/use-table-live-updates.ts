import { useContext, useEffect, useRef } from "react";
import TableContext from "../lib/context";

function useTableLiveUpdates() {
  const context = useContext(TableContext);
  const interval = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state } = context;

  function enableLiveUpdates() {
    if (state.tableProps.liveUpdatesInterval) {
      interval.current = setInterval(() => {
        state.api?.refreshServerSide(undefined);
      }, state.tableProps.liveUpdatesInterval);
    }
  }

  function disableLiveUpdates() {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }

  useEffect(() => {
    if (!state.api) return;

    if (state.tableProps.liveUpdatesInterval) {
      enableLiveUpdates();
    } else {
      disableLiveUpdates();
    }
  }, [state.tableProps.liveUpdatesInterval, state.api]);
}

export default useTableLiveUpdates;
