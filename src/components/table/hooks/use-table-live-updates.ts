import { useCallback, useContext, useEffect, useRef } from "react";
import TableContext from "../lib/context";
import type { GridReadyEvent } from "ag-grid-community";

function useTableLiveUpdates() {
  const context = useContext(TableContext);
  const interval = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!context) {
    throw new Error("The table context wasn't properly initialized.");
  }

  const { state } = context;

  const onGridReadyForLiveUpdates = useCallback(
    ({ api }: GridReadyEvent) => {
      if (state.settings.liveUpdates && state.tableProps.refreshInterval) {
        interval.current = setInterval(() => {
          api.refreshServerSide(undefined);
        }, state.tableProps.refreshInterval);
      }
    },
    [state.settings.liveUpdates, state.tableProps.refreshInterval]
  );

  const disableLiveUpdates = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!state.settings.liveUpdates) {
      disableLiveUpdates();
    }
  }, [state.settings.liveUpdates]);

  return { onGridReadyForLiveUpdates };
}

export default useTableLiveUpdates;
