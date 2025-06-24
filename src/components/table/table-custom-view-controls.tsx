import { CustomView } from "./lib/types";
import styles from "./table-custom-view-controls.module.css";
import useTableCustomViews from "./hooks/use-table-custom-views";

function TableCustomViewControls() {
  const { state, dispatch, setGridReady, resetGridState, switchCustomView } =
    useTableCustomViews();

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
      type: state.tableProps.customViewsType!,
    };

    state.tableProps.onCreateCustomView?.(newCustomView);
    dispatch({
      type: "SET_ACTIVE_CUSTOM_VIEW",
      payload: newCustomView,
    });
    setGridReady();
  }

  function onSave() {
    const gridState = state.api?.getState();

    if (!state.activeCustomView || !gridState) return;

    const savedCustomView: CustomView = {
      ...state.activeCustomView,
      state: gridState,
    };

    state.tableProps.onSaveCustomView?.(savedCustomView);
    dispatch({
      type: "PERSIST_CUSTOM_VIEW_STATE",
      payload: gridState,
    });
    setGridReady();
  }

  if (state.tableProps.customViewsLayout === "none") {
    return null;
  }

  return (
    <div>
      {state.tableProps.customViewsLayout === "simple" ? (
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

      {state.tableProps.customViewsLayout === "dropdown" ? (
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
                state.tableProps.onSelectCustomView?.();
              }}
            >
              Default view
            </button>

            {state.tableProps.customViews ? (
              <>
                {state.tableProps.customViews.map((customView) => (
                  <div key={customView.id}>
                    <button
                      type="button"
                      onClick={() => {
                        switchCustomView(customView);
                        state.tableProps.onSelectCustomView?.(customView);
                      }}
                    >
                      {customView.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        state.tableProps.onDeleteCustomView?.(customView);
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
              </>
            ) : null}

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
