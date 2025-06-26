import type { GridApi, GridState, RowClassParams } from "ag-grid-community";
import { AgGridReactProps } from "ag-grid-react";

export type TableSettings = {
  highlightErrors: boolean;
  columnHeadersInCode: boolean;
  enableAdvancedFilter: boolean;
  liveUpdates: boolean;
  customViewsQuickActions: boolean;
};

export type TableContextState = {
  modified: boolean;
  customViewState?: GridState;
  initialCustomViewState: GridState;
  activeCustomView?: CustomView;
  settings: TableSettings;
  ready: boolean;
  api: GridApi | null;
  tableProps: TableProps & AgGridReactProps;
};

export type TableProps = {
  customViewsType?: string;
  customViews?: CustomView[];
  customViewsLayout?: "none" | "simple" | "dropdown";
  activeCustomView?: CustomView;
  refreshInterval?: number;
  onCreateCustomView?: (customView: CustomView) => void;
  onSaveCustomView?: (customView: CustomView) => void;
  onDeleteCustomView?: (customView: CustomView) => void;
  onSelectCustomView?: (customView?: CustomView) => void;
  getRowErrorState?: (data: RowClassParams) => "failed" | "invalid" | undefined;
};

export type TableActions =
  | {
      type: "UPDATE_CUSTOM_VIEW_STATE";
      payload: GridState;
    }
  | {
      type: "SET_ACTIVE_CUSTOM_VIEW";
      payload: CustomView;
    }
  | {
      type: "UPDATE_ACTIVE_CUSTOM_VIEW";
      payload: CustomView;
    }
  | {
      type: "RESET_MODIFIED_STATE";
    }
  | {
      type: "RESET_ALL";
    }
  | {
      type: "SET_GRID_READY";
    }
  | {
      type: "PERSIST_CUSTOM_VIEW_STATE";
      payload: GridState;
    }
  | {
      type: "TOGGLE_TABLE_SETTING";
      payload: Partial<TableSettings>;
    }
  | {
      type: "INIT";
      payload: {
        initialCustomViewState: GridState;
        activeCustomView?: CustomView;
      };
    }
  | {
      type: "INIT_GRID_API";
      payload: GridApi;
    };

export type CustomView = {
  id: string;
  title: string;
  state: GridState;
  type: string;
};
