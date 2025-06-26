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
    rowSelection: [],
    ready: true,
    api: null,
    activeCustomView: undefined,
    customViewState: undefined,
    initialCustomViewState: {},
    tableProps: {},
    settings: {
      highlightErrors: true,
      columnHeadersInCode: false,
      enableAdvancedFilter: false,
      customViewsQuickActions: true,
      liveUpdates: true,
    },
    ...overrides,
  };
}

export default createContext<TableContext>({
  state: getInitialTableContextState(),
  dispatch: () => {},
});
