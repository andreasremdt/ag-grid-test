import useTableState from "../hooks/use-table-state";
import styles from "./table-menu.module.css";

function TableSettings() {
  const { settings, tableProps, setGridSettings } = useTableState();

  return (
    <>
      <h3 className={styles.separator}>Table settings</h3>
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
      <button
        className={styles.button}
        type="button"
        onClick={() =>
          setGridSettings({
            columnHeadersInCode: !settings.columnHeadersInCode,
          })
        }
      >
        Show column headers in code format -{" "}
        {settings.columnHeadersInCode ? "Yes" : "No"}
      </button>

      {tableProps.refreshInterval ? (
        <button
          className={styles.button}
          type="button"
          onClick={() =>
            setGridSettings({ liveUpdates: !settings.liveUpdates })
          }
        >
          Live updates -{settings.liveUpdates ? "Yes" : "No"}
        </button>
      ) : null}

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
      {tableProps.customViewsLayout === "simple" ? (
        <button
          className={styles.button}
          type="button"
          onClick={() =>
            setGridSettings({
              customViewsQuickActions: !settings.customViewsQuickActions,
            })
          }
        >
          Custom views quick actions -
          {settings.customViewsQuickActions ? "Yes" : "No"}
        </button>
      ) : null}
    </>
  );
}

export default TableSettings;
