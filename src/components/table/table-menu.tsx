import { useId } from "react";
import styles from "./table-menu.module.css";
import useTableState from "./hooks/use-table-state";

function TableMenu() {
  const id = useId();
  const { state, setGridSettings } = useTableState();

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
              highlightErrors: !state.settings.highlightErrors,
            })
          }
        >
          Highlight errors {state.settings.highlightErrors ? "Yes" : "No"}
        </button>
        <button
          type="button"
          onClick={() =>
            setGridSettings({
              columnHeadersInCode: !state.settings.columnHeadersInCode,
            })
          }
        >
          Show column headers in code format -{" "}
          {state.settings.columnHeadersInCode ? "Yes" : "No"}
        </button>
        <button
          type="button"
          onClick={() =>
            setGridSettings({ liveUpdates: !state.settings.liveUpdates })
          }
        >
          Disable live updates -{state.settings.liveUpdates ? "Yes" : "No"}
        </button>
        <button
          type="button"
          onClick={() =>
            setGridSettings({
              enableAdvancedFilter: !state.settings.enableAdvancedFilter,
            })
          }
        >
          Advanced filters -{state.settings.enableAdvancedFilter ? "Yes" : "No"}
        </button>
      </div>
    </div>
  );
}

export default TableMenu;
