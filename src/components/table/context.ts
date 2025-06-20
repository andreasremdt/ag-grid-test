import { type Dispatch, createContext } from "react";
import type { TableActions, TableContextState } from "./types";

type TableContext = {
  state: TableContextState;
  dispatch: Dispatch<TableActions>;
};

export const initialTableContextState: TableContextState = {
  modified: false,
  activeCustomView: null,
  customViewState: null,
  initialCustomViewState: {
    columnState: [],
    filterState: {},
  },
  api: null,
};

export default createContext<TableContext>({
  state: initialTableContextState,
  dispatch: () => {},
});
