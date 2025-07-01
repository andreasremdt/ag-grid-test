"use client";

import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import theme from "./lib/theme";
import TableToolbar from "./table-toolbar/table-toolbar";
import useTableState from "./hooks/use-table-state";
import {
  AllEnterpriseModule,
  LicenseManager,
  ModuleRegistry,
} from "ag-grid-enterprise";
import useTableCustomViews from "./hooks/use-table-custom-views";
import { forwardEvent } from "@/lib/utils";
import useTableLiveUpdates from "./hooks/use-table-live-updates";

ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE!);

function Table(props: AgGridReactProps) {
  const { ready, customViewState, settings, onStateUpdated } =
    useTableCustomViews();
  const { defaultColDef, rowClassRules, onGridReady, onRowSelected } =
    useTableState();
  const { onGridReadyForLiveUpdates } = useTableLiveUpdates();

  return (
    <div style={{ height: 400 }}>
      <TableToolbar />

      {ready ? (
        <AgGridReact
          {...props}
          theme={theme}
          rowHeight={36}
          loadThemeGoogleFonts={false}
          suppressServerSideFullWidthLoadingRow
          suppressDragLeaveHidesColumns
          suppressCellFocus
          tooltipShowDelay={500}
          tooltipMouseTrack
          animateRows={false}
          defaultColDef={defaultColDef}
          onStateUpdated={forwardEvent(props.onStateUpdated, onStateUpdated)}
          onRowSelected={forwardEvent(props.onRowSelected, onRowSelected)}
          onGridReady={forwardEvent(
            props.onGridReady,
            onGridReady,
            onGridReadyForLiveUpdates
          )}
          initialState={customViewState}
          rowClassRules={rowClassRules}
          enableAdvancedFilter={settings.enableAdvancedFilter}
        />
      ) : (
        <p>Skeleton Loader</p>
      )}
    </div>
  );
}

export default Table;
