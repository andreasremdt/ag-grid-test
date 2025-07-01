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
  enableAdvancedFilter,
  quickFilter,
  contextSource,
  columnHeaderFormat = "text",
  liveUpdatesInterval,
  customViewsQuickActions = true,
  onToggleColumnHeaderFormat,
  onToggleLiveUpdates,
  onToggleCustomViewsQuickActions,
  getSelectionOptions,
  getTableActions,
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
      customViews: {
        activeView: activeCustomView,
        modifiedState: activeCustomView?.state,
        modified: false,
        initialState: {},
      },
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
            enableAdvancedFilter,
            quickFilter,
            contextSource,
            columnHeaderFormat,
            liveUpdatesInterval,
            customViewsQuickActions,
            onToggleColumnHeaderFormat,
            onToggleLiveUpdates,
            onToggleCustomViewsQuickActions,
            getSelectionOptions,
            getTableActions,
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
