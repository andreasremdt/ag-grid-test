import { CustomView } from "./lib/types";
import useTableState from "./use-table-state";
import styles from "./table-custom-view-controls.module.css";

type Props = {
  customViewsType?: string;
  customViews: CustomView[];
  customViewsLayout: "none" | "simple" | "dropdown";
  onCreateCustomView?: (customView: CustomView) => void;
  onSaveCustomView?: (customView: CustomView) => void;
  onDeleteCustomView?: (customView: CustomView) => void;
  onSelectCustomView?: (customView?: CustomView) => void;
};

function TableCustomViewControls({
  customViewsType,
  customViews,
  customViewsLayout,
  onCreateCustomView,
  onSaveCustomView,
  onDeleteCustomView,
  onSelectCustomView,
}: Props) {
  const { state, dispatch, setGridReady, resetGridState, switchCustomView } =
    useTableState();

  function isSaveButtonDisabled(customView?: CustomView) {
    if (!customView || !state.modified) return true;

    return customView.id !== state.activeCustomView?.id;
  }

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
    const gridState = state.api?.getState();

    if (!state.activeCustomView || !gridState) return;

    const savedCustomView: CustomView = {
      ...state.activeCustomView,
      state: gridState,
    };

    onSaveCustomView?.(savedCustomView);
    dispatch({
      type: "PERSIST_CUSTOM_VIEW_STATE",
      payload: gridState,
    });
    setGridReady();
  }

  if (customViewsLayout === "none") {
    return null;
  }

  return (
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
        <>
          <button
            type="button"
            popoverTarget="custom-views-menu"
            className={styles.toggle}
          >
            <b>Custom view:</b>{" "}
            {state.activeCustomView?.title || "Default view"}
          </button>

          <div id="custom-views-menu" popover="auto" className={styles.popover}>
            <button
              type="button"
              onClick={() => {
                switchCustomView();
                onSelectCustomView?.();
              }}
            >
              Default view
            </button>

            {customViews.map((customView) => (
              <div key={customView.id}>
                <button
                  type="button"
                  onClick={() => {
                    switchCustomView(customView);
                    onSelectCustomView?.(customView);
                  }}
                >
                  {customView.title}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteCustomView?.(customView);
                    switchCustomView();
                  }}
                >
                  Delete
                </button>
                <button
                  disabled={isSaveButtonDisabled(customView)}
                  type="button"
                  onClick={onSave}
                >
                  Save
                </button>
              </div>
            ))}

            <hr className={styles.separator} />

            <button type="button" onClick={onCreate} disabled={!state.modified}>
              Add new custom view
            </button>
          </div>
        </>
      ) : null}

      {state.modified ? (
        <button type="button" onClick={resetGridState}>
          Reset view
        </button>
      ) : null}
    </div>
  );
}

export default TableCustomViewControls;
