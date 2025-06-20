import type { ColumnState, FilterModel, GridApi } from "ag-grid-community";

export type TableContextState = {
  modified: boolean;
  customViewState: CustomViewState | null;
  initialCustomViewState: CustomViewState;
  activeCustomView: CustomView | null;
  api: GridApi | null;
};

export type TableActions =
  | {
      type: "UPDATE_CUSTOM_VIEW";
      payload: CustomViewState;
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
      type: "INIT";
      payload: {
        api: GridApi;
        initialCustomViewState: CustomViewState;
        activeCustomView?: CustomView;
      };
    };

export type CustomViewState = {
  columnState: ColumnState[];
  filterState: FilterModel;
};

export type CustomView = {
  id: string;
  title: string;
  state: CustomViewState;
  type: string;
};
