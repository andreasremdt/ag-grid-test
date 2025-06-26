import type { TableActions, TableContextState } from "./types";

function reducer(
  state: TableContextState,
  action: TableActions
): TableContextState {
  switch (action.type) {
    case "UPDATE_CUSTOM_VIEW_STATE":
      return {
        ...state,
        modified: true,
        customViewState: action.payload,
      };

    case "RESET_MODIFIED_STATE":
      return {
        ...state,
        modified: false,
        ready: false,
        customViewState: state.activeCustomView?.state,
      };

    case "RESET_ALL":
      return {
        ...state,
        modified: false,
        activeCustomView: undefined,
        customViewState: undefined,
        ready: false,
      };

    case "PERSIST_CUSTOM_VIEW_STATE":
      return {
        ...state,
        ready: false,
        modified: false,
        customViewState: action.payload,
      };

    case "SET_ACTIVE_CUSTOM_VIEW":
      return {
        ...state,
        ready: false,
        modified: false,
        activeCustomView: action.payload,
        customViewState: action.payload.state,
      };

    case "UPDATE_ACTIVE_CUSTOM_VIEW":
      return {
        ...state,
        activeCustomView: action.payload,
      };

    case "SET_GRID_READY":
      return { ...state, ready: true };

    case "TOGGLE_TABLE_SETTING":
      return {
        ...state,
        ready: false,
        settings: { ...state.settings, ...action.payload },
      };

    case "INIT":
      return { ...state, ...action.payload };

    case "INIT_GRID_API":
      return { ...state, api: action.payload };

    default:
      return state;
  }
}

export default reducer;
