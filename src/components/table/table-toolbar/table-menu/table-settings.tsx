import useTableState from "../../hooks/use-table-state";
import styles from "./table-menu.module.css";

function TableSettings() {
  const { settings, tableProps, setGridSettings } = useTableState();

  return (
    <>
      <h3 className={styles.separator}>Table settings</h3>

      {tableProps.getRowErrorState ? (
        <button
          className={styles.button}
          type="button"
          onClick={() =>
            setGridSettings({
              highlightErrors: !settings.highlightErrors,
            })
          }
        >
          Highlight errors {settings.highlightErrors ? "Yes" : "No"}
        </button>
      ) : null}

      {tableProps.onToggleColumnHeaderFormat ? (
        <button
          className={styles.button}
          type="button"
          onClick={tableProps.onToggleColumnHeaderFormat}
        >
          Show column headers in code format -{" "}
          {tableProps.columnHeaderFormat === "code" ? "Yes" : "No"}
        </button>
      ) : null}

      {tableProps.onToggleLiveUpdates ? (
        <button
          className={styles.button}
          type="button"
          onClick={tableProps.onToggleLiveUpdates}
        >
          Live updates -{tableProps.liveUpdatesInterval ? "Yes" : "No"}
        </button>
      ) : null}

      {tableProps.enableAdvancedFilter ? (
        <button
          className={styles.button}
          type="button"
          onClick={() =>
            setGridSettings({
              enableAdvancedFilter: !settings.enableAdvancedFilter,
            })
          }
        >
          Advanced filters -{settings.enableAdvancedFilter ? "Yes" : "No"}
        </button>
      ) : null}

      {tableProps.customViewsLayout === "toolbar" &&
      tableProps.onToggleCustomViewsQuickActions ? (
        <button
          className={styles.button}
          type="button"
          onClick={tableProps.onToggleCustomViewsQuickActions}
        >
          Custom views quick actions -
          {tableProps.customViewsQuickActions ? "Yes" : "No"}
        </button>
      ) : null}
    </>
  );
}

export default TableSettings;
