import { useReducer } from "react";
import TableContext, { getInitialTableContextState } from "./lib/context";
import reducer from "./lib/reducer";
import type { TableProps } from "./lib/types";
import Table from "./table";
import type { AgGridReactProps } from "ag-grid-react";

function TableWrapper({
  customViewsType,
  customViews,
  customViewsLayout,
  activeCustomView,
  refreshInterval,
  enableAdvancedFilter,
  quickFilter,
  getSelectionOptions,
  onCreateCustomView,
  onSaveCustomView,
  onDeleteCustomView,
  onSelectCustomView,
  getRowErrorState,
  ...props
}: TableProps & AgGridReactProps) {
  const [state, dispatch] = useReducer(
    reducer,
    getInitialTableContextState({
      activeCustomView,
      customViewState: activeCustomView?.state,
    })
  );

  return (
    <TableContext.Provider
      value={{
        state: {
          ...state,
          tableProps: {
            customViewsType,
            customViews,
            customViewsLayout,
            activeCustomView,
            refreshInterval,
            enableAdvancedFilter,
            quickFilter,
            getSelectionOptions,
            onCreateCustomView,
            onSaveCustomView,
            onDeleteCustomView,
            onSelectCustomView,
            getRowErrorState,
            ...props,
          },
        },
        dispatch,
      }}
    >
      <Table {...props} />
    </TableContext.Provider>
  );
}

export default TableWrapper;
