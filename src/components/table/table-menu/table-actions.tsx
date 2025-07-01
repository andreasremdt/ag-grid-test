import useTableState from "../hooks/use-table-state";
import styles from "./table-menu.module.css";

function TableActions() {
  const { tableProps } = useTableState();

  if (
    !tableProps.getTableActions ||
    tableProps.getTableActions().length === 0
  ) {
    return null;
  }

  return (
    <>
      <h3 className={styles.separator}>Table actions</h3>

      {tableProps.getTableActions().map((action) => (
        <button
          className={styles.button}
          type="button"
          onClick={action.callback}
          key={action.title}
        >
          {action.title}
        </button>
      ))}
    </>
  );
}

export default TableActions;
