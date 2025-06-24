import { CustomView } from "./lib/types";
import styles from "./table-custom-view-controls.module.css";
import useTableCustomViews from "./hooks/use-table-custom-views";

function TableCustomViewControls() {
  const {
    modified,
    activeCustomView,
    tableProps,
    resetGridState,
    switchCustomView,
    createCustomView,
    saveCustomView,
  } = useTableCustomViews();

  function isSaveButtonDisabled(customView?: CustomView) {
    if (!customView || !modified) return true;

    return customView.id !== activeCustomView?.id;
  }

  if (tableProps.customViewsLayout === "none") {
    return null;
  }

  return (
    <div>
      {tableProps.customViewsLayout === "simple" ? (
        <>
          {modified ? (
            <button type="button" onClick={createCustomView}>
              Create custom view
            </button>
          ) : null}

          {activeCustomView && modified ? (
            <button type="button" onClick={saveCustomView}>
              Save changes
            </button>
          ) : null}
        </>
      ) : null}

      {tableProps.customViewsLayout === "dropdown" ? (
        <>
          <button
            type="button"
            popoverTarget="custom-views-menu"
            className={styles.toggle}
          >
            <b>Custom view:</b> {activeCustomView?.title || "Default view"}
          </button>

          <div id="custom-views-menu" popover="auto" className={styles.popover}>
            <button
              type="button"
              onClick={() => {
                switchCustomView();
                tableProps.onSelectCustomView?.();
              }}
            >
              Default view
            </button>

            {tableProps.customViews ? (
              <>
                {tableProps.customViews.map((customView) => (
                  <div key={customView.id}>
                    <button
                      type="button"
                      onClick={() => {
                        switchCustomView(customView);
                        tableProps.onSelectCustomView?.(customView);
                      }}
                    >
                      {customView.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        tableProps.onDeleteCustomView?.(customView);
                        switchCustomView();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      disabled={isSaveButtonDisabled(customView)}
                      type="button"
                      onClick={saveCustomView}
                    >
                      Save
                    </button>
                  </div>
                ))}

                <hr className={styles.separator} />
              </>
            ) : null}

            <button
              type="button"
              onClick={createCustomView}
              disabled={!modified}
            >
              Add new custom view
            </button>
          </div>
        </>
      ) : null}

      {modified ? (
        <button type="button" onClick={resetGridState}>
          Reset view
        </button>
      ) : null}
    </div>
  );
}

export default TableCustomViewControls;
