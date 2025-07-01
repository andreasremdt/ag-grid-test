import useTableState from "../../hooks/use-table-state";
import tableActionFactory from "./table-action-factory";
import styles from "./table-menu.module.css";

function TableActions() {
  const { tableProps } = useTableState();

  if (!tableProps.tableActions?.length) {
    return null;
  }

  return (
    <>
      <h3 className={styles.separator}>Table actions</h3>

      {tableProps.tableActions.map(tableActionFactory)}
    </>
  );
}

export default TableActions;
