import type { TableActions, TableContextState } from "./types";

function reducer(
  state: TableContextState,
  action: TableActions
): TableContextState {
  switch (action.type) {
    case "UPDATE_CUSTOM_VIEW_STATE":
      return {
        ...state,
        customViews: {
          ...state.customViews,
          modified: true,
          modifiedState: action.payload,
        },
      };

    case "RESET_MODIFIED_STATE":
      return {
        ...state,
        customViews: {
          ...state.customViews,
          modified: false,
          modifiedState: state.customViews.activeView?.state,
        },
        ready: false,
      };

    case "RESET_ALL":
      return {
        ...state,
        customViews: {
          ...state.customViews,
          modified: false,
          activeView: undefined,
          modifiedState: undefined,
        },
        ready: false,
      };

    case "PERSIST_CUSTOM_VIEW_STATE":
      return {
        ...state,
        customViews: {
          ...state.customViews,
          modified: false,
          modifiedState: action.payload,
        },
        ready: false,
      };

    case "SET_ACTIVE_CUSTOM_VIEW":
      return {
        ...state,
        customViews: {
          ...state.customViews,
          modified: false,
          modifiedState: action.payload.state,
          activeView: action.payload,
        },
        ready: false,
      };

    case "UPDATE_ACTIVE_CUSTOM_VIEW":
      return {
        ...state,
        customViews: { ...state.customViews, activeView: action.payload },
      };

    case "SET_ROW_SELECTION":
      return { ...state, rowSelection: action.payload };

    case "SET_GRID_READY":
      return { ...state, ready: true };

    case "TOGGLE_TABLE_SETTING":
      return {
        ...state,
        ready: false,
        settings: { ...state.settings, ...action.payload },
      };

    case "INIT":
      return {
        ...state,
        customViews: { ...state.customViews, initialState: action.payload },
      };

    case "DESTROY":
      return { ...state, ready: false };

    case "INIT_GRID_API":
      return { ...state, api: action.payload };

    default:
      return state;
  }
}

export default reducer;
