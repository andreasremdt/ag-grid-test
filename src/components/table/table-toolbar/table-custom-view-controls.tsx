import styles from "./table-custom-view-controls.module.css";
import useTableCustomViews from "../hooks/use-table-custom-views";
import TableCustomViewEntry from "./table-custom-view-entry";
import useInlineEditable from "@/hooks/use-inline-editable";

function TableCustomViewControls() {
  const {
    customViews,
    tableProps,
    settings,
    resetGridState,
    switchCustomView,
    createCustomView,
    saveCustomView,
  } = useTableCustomViews();

  const { editing, onStartEditing, onSubmit, onKeyDown } =
    useInlineEditable(createCustomView);

  if (
    tableProps.customViewsLayout === "none" ||
    !settings.customViewsQuickActions
  ) {
    return null;
  }

  return (
    <div>
      {tableProps.customViewsLayout === "simple" ? (
        <>
          {customViews.modified ? (
            <>
              {editing ? (
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    placeholder="Untitled custom view"
                    onKeyDown={onKeyDown}
                    autoFocus
                    name="title"
                  />
                  <button type="submit">Ok</button>
                </form>
              ) : (
                <button type="button" onClick={onStartEditing}>
                  Create custom view
                </button>
              )}
            </>
          ) : null}

          {customViews.activeView && customViews.modified ? (
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
            <b>Custom view:</b>{" "}
            {customViews.activeView?.title || "Default view"}
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
                  <TableCustomViewEntry
                    key={customView.id}
                    customView={customView}
                  />
                ))}

                <hr className={styles.separator} />
              </>
            ) : null}

            {editing ? (
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Untitled custom view"
                  onKeyDown={onKeyDown}
                  autoFocus
                  name="title"
                />
                <button type="submit">Ok</button>
              </form>
            ) : (
              <button
                type="button"
                onClick={onStartEditing}
                disabled={!customViews.modified}
              >
                Add new custom view
              </button>
            )}
          </div>
        </>
      ) : null}

      {customViews.modified ? (
        <button type="button" onClick={resetGridState}>
          Reset view
        </button>
      ) : null}
    </div>
  );
}

export default TableCustomViewControls;
