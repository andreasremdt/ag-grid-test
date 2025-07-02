import type { GridApi, GridState, RowClassParams } from "ag-grid-community";
import { AgGridReactProps } from "ag-grid-react";

export type TableSettings = {
  highlightErrors: boolean;
  enableAdvancedFilter: boolean;
};

export type TableCustomViews = {
  modified: boolean;
  modifiedState?: GridState;
  initialState: GridState;
  activeView?: CustomView;
};

export type TableEmptyState = {
  title?: string;
  description?: string;
  filters?: {
    title?: string;
    description?: string;
    reset?: boolean;
  };
};

export type TableContextSource = {
  get: () => Promise<{
    metadata?: object;
  }>;
};

export type TableContextState = {
  customViews: TableCustomViews;
  settings: TableSettings;
  ready: boolean;
  api: GridApi | null;
  rowSelection: object[];
  tableProps: TableProps & AgGridReactProps;
};

export type TableProps = {
  customViewsType?: string;
  customViews?: CustomView[];
  customViewsLayout?: "none" | "simple" | "dropdown";
  activeCustomView?: CustomView;
  enableAdvancedFilter?: boolean;
  quickFilter?: string;
  contextSource?: TableContextSource;
  columnHeaderFormat?: "code" | "text";
  liveUpdatesInterval?: number;
  customViewsQuickActions?: boolean;
  emptyState?: TableEmptyState;
  onToggleColumnHeaderFormat?: () => void;
  onToggleLiveUpdates?: () => void;
  onToggleCustomViewsQuickActions?: () => void;
  getSelectionOptions?: (selection: object[]) => {
    icon: string;
    title: string;
    callback: () => void;
  }[];
  tableActions?: string[];
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
      type: "SET_ROW_SELECTION";
      payload: object[];
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
      payload: GridState;
    }
  | { type: "DESTROY" }
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
