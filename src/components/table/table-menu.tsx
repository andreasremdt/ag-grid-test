import { useId } from "react";
import styles from "./table-menu.module.css";
import useTableState from "./hooks/use-table-state";

function TableMenu() {
  const id = useId();
  const { settings, setGridSettings } = useTableState();

  return (
    <div className={styles.container}>
      <button popoverTarget={id} type="button" className={styles.toggle}>
        Menu
      </button>

      <div id={id} popover="auto" className={styles.popover}>
        <h3 className={styles.separator}>Table settings</h3>
        <button
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
        <button
          type="button"
          onClick={() =>
            setGridSettings({ liveUpdates: !settings.liveUpdates })
          }
        >
          Disable live updates -{settings.liveUpdates ? "Yes" : "No"}
        </button>
        <button
          type="button"
          onClick={() =>
            setGridSettings({
              enableAdvancedFilter: !settings.enableAdvancedFilter,
            })
          }
        >
          Advanced filters -{settings.enableAdvancedFilter ? "Yes" : "No"}
        </button>
      </div>
    </div>
  );
}

export default TableMenu;
