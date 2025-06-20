import type { TableActions, TableContextState } from "./types";

function reducer(
  state: TableContextState,
  action: TableActions
): TableContextState {
  switch (action.type) {
    case "UPDATE_CUSTOM_VIEW":
      return {
        ...state,
        modified: true,
        customViewState: action.payload,
      };

    case "RESET_MODIFIED_STATE":
      return { ...state, modified: false, customViewState: null };

    case "RESET_ALL":
      return {
        ...state,
        modified: false,
        activeCustomView: null,
        customViewState: null,
      };

    case "SET_ACTIVE_CUSTOM_VIEW":
      return { ...state, activeCustomView: action.payload };

    case "INIT":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export default reducer;
