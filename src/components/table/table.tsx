"use client";

import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import theme from "./theme";
import Toolbar from "./toolbar";
import { forwardEvent } from "@/lib/utils";
import type { CustomView } from "./types";
import useTableState from "./use-table-state";
import {
  AllEnterpriseModule,
  LicenseManager,
  ModuleRegistry,
} from "ag-grid-enterprise";
import { useReducer } from "react";
import TableContext, { initialTableContextState } from "./context";
import reducer from "./reducer";

type Props = AgGridReactProps & {
  customViewsType?: string;
  customViews?: CustomView[];
  customViewsLayout?: "none" | "simple" | "dropdown";
  activeCustomView?: CustomView;
  heading?: string;
  onCreateCustomView?: (customView: CustomView) => void;
  onSaveCustomView?: (customView: CustomView) => void;
  onDeleteCustomView?: (customView: CustomView) => void;
};

ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE!);

function Table({
  customViewsType,
  customViews = [],
  activeCustomView,
  customViewsLayout = "none",
  heading,
  onCreateCustomView,
  onSaveCustomView,
  onDeleteCustomView,
  ...props
}: Props) {
  const { onStateUpdated, onInitGrid } = useTableState(activeCustomView);

  return (
    <div>
      <Toolbar
        customViewsType={customViewsType}
        customViews={customViews}
        activeCustomView={activeCustomView}
        customViewsLayout={customViewsLayout}
        heading={heading}
        onCreateCustomView={onCreateCustomView}
        onSaveCustomView={onSaveCustomView}
        onDeleteCustomView={onDeleteCustomView}
      />

      <AgGridReact
        {...props}
        theme={theme}
        rowHeight={36}
        domLayout="autoHeight"
        suppressServerSideFullWidthLoadingRow
        suppressDragLeaveHidesColumns
        tooltipShowDelay={500}
        tooltipMouseTrack
        animateRows={false}
        onFilterChanged={forwardEvent(props.onFilterChanged, onStateUpdated)}
        onColumnResized={forwardEvent(props.onColumnResized, onStateUpdated)}
        onSortChanged={forwardEvent(props.onSortChanged, onStateUpdated)}
        onColumnVisible={forwardEvent(props.onColumnVisible, onStateUpdated)}
        onColumnMoved={forwardEvent(props.onColumnMoved, onStateUpdated)}
        onGridReady={forwardEvent(props.onGridReady, onInitGrid)}
      />
    </div>
  );
}

function TableWrapper(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialTableContextState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      <Table {...props} />
    </TableContext.Provider>
  );
}

export default TableWrapper;
