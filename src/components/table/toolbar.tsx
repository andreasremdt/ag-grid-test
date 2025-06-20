import { ChangeEvent } from "react";
import { CustomView } from "./types";
import useTableState from "./use-table-state";
import { getGridState } from "./utils";
import styles from "./toolbar.module.css";

type Props = {
  customViewsType?: string;
  customViews: CustomView[];
  activeCustomView?: CustomView;
  customViewsLayout: "none" | "simple" | "dropdown";
  heading?: string;
  onCreateCustomView?: (customView: CustomView) => void;
  onSaveCustomView?: (customView: CustomView) => void;
  onDeleteCustomView?: (customView: CustomView) => void;
};

function Toolbar({
  customViewsType,
  customViews,
  activeCustomView,
  customViewsLayout,
  heading,
  onCreateCustomView,
  onSaveCustomView,
  onDeleteCustomView,
}: Props) {
  const { state, dispatch, onResetGridState, onSwitchCustomView } =
    useTableState();

  function onCreate() {
    if (!state.customViewState) return;

    const newCustomView: CustomView = {
      id: Date.now().toString(),
      title: `My Custom View ${Math.random() * 100}`,
      state: state.customViewState,
      type: customViewsType!,
    };

    onCreateCustomView?.(newCustomView);
  }

  function onSave() {
    if (!state.activeCustomView) return;

    const savedCustomView: CustomView = {
      ...state.activeCustomView,
      state: getGridState(state.api),
    };

    onSaveCustomView?.(savedCustomView);
    dispatch({ type: "RESET_MODIFIED_STATE" });
  }

  function onDelete() {
    if (!state.activeCustomView) return;

    onDeleteCustomView?.(state.activeCustomView);
    dispatch({ type: "RESET_ALL" });
  }

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedCustomView = customViews.find(
      (customView) => customView.id === event.target.value
    );

    onSwitchCustomView(selectedCustomView);
  }

  return (
    <header>
      {["simple", "none"].includes(customViewsLayout) && heading ? (
        <h1 className={styles.title}>{heading}</h1>
      ) : null}

      {customViewsLayout !== "none" ? (
        <div>
          {customViewsLayout === "simple" ? (
            <>
              {state.modified ? (
                <button type="button" onClick={onCreate}>
                  Create custom view
                </button>
              ) : null}

              {state.activeCustomView && state.modified ? (
                <button type="button" onClick={onSave}>
                  Save changes
                </button>
              ) : null}
            </>
          ) : null}

          {customViewsLayout === "dropdown" ? (
            <select defaultValue={activeCustomView?.id} onChange={onChange}>
              <option value="">Default view</option>

              {customViews.map((customView) => (
                <option key={customView.id} value={customView.id}>
                  {customView.title}
                </option>
              ))}
            </select>
          ) : null}

          {state.modified ? (
            <button type="button" onClick={onResetGridState}>
              Reset view
            </button>
          ) : null}
        </div>
      ) : null}
      {/* 
        {state.activeCustomView ? (
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        ) : null} */}
    </header>
  );
}

export default Toolbar;
