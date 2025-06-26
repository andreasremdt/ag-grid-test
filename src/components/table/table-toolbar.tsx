import TableCustomViewControls from "./table-custom-view-controls";
import TableMenu from "./table-menu/table-menu";
import TableSelectionControls from "./table-selection-controls";
import styles from "./table-toolbar.module.css";

function TableToolbar() {
  return (
    <header className={styles.toolbar}>
      <TableSelectionControls />

      <TableCustomViewControls />

      <TableMenu />
    </header>
  );
}

export default TableToolbar;
