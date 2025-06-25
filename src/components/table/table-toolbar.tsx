import TableCustomViewControls from "./table-custom-view-controls";
import TableMenu from "./table-menu/table-menu";
import styles from "./table-toolbar.module.css";

function TableToolbar() {
  return (
    <header className={styles.toolbar}>
      <TableCustomViewControls />

      <TableMenu />
    </header>
  );
}

export default TableToolbar;
