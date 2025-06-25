import { useId } from "react";
import styles from "./table-menu.module.css";
import TableSettings from "./table-settings";
import CustomViewActions from "./custom-view-actions";

function TableMenu() {
  const id = useId();

  return (
    <div className={styles.container}>
      <button popoverTarget={id} type="button" className={styles.toggle}>
        Menu
      </button>

      <div id={id} popover="auto" className={styles.popover}>
        <CustomViewActions />
        <TableSettings />
      </div>
    </div>
  );
}

export default TableMenu;
