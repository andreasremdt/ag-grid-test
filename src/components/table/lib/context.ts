import { type Dispatch, createContext } from "react";
import type { TableActions, TableContextState } from "./types";

type TableContext = {
  state: TableContextState;
  dispatch: Dispatch<TableActions>;
};

export function getInitialTableContextState(
  overrides: Partial<TableContextState> = {}
): TableContextState {
  return {
    modified: false,
    ready: true,
    api: null,
    activeCustomView: undefined,
    customViewState: undefined,
    settings: {
      highlightErrors: true,
      columnHeadersInCode: false,
      enableAdvancedFilter: false,
      liveUpdates: true,
    },
    initialCustomViewState: {},
    ...overrides,
  };
}

export default createContext<TableContext>({
  state: getInitialTableContextState(),
  dispatch: () => {},
});
