import type { GridApi, GridState } from "ag-grid-community";

export type TableSettings = {
  highlightErrors: boolean;
  columnHeadersInCode: boolean;
  enableAdvancedFilter: boolean;
  liveUpdates: boolean;
};

export type TableContextState = {
  modified: boolean;
  customViewState?: GridState;
  initialCustomViewState: GridState;
  activeCustomView?: CustomView;
  settings: TableSettings;
  ready: boolean;
  api: GridApi | null;
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
        api: GridApi;
        initialCustomViewState: GridState;
        activeCustomView?: CustomView;
      };
    };

export type CustomView = {
  id: string;
  title: string;
  state: GridState;
  type: string;
};
