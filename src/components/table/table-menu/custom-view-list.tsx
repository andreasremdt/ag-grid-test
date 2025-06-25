import type { ReactNode } from "react";
import useTableCustomViews from "../hooks/use-table-custom-views";
import TableCustomViewEntry from "../table-custom-view-entry";
import styles from "./table-menu.module.css";

type Props = {
  children: ReactNode;
};

function CustomViewList({ children }: Props) {
  const { tableProps, switchCustomView } = useTableCustomViews();

  return (
    <>
      {children}

      <h3 className={styles.separator}>Change custom view</h3>
      <button
        type="button"
        onClick={() => {
          switchCustomView();
          tableProps.onSelectCustomView?.();
        }}
      >
        Default view
      </button>

      {tableProps.customViews?.map((customView) => (
        <TableCustomViewEntry key={customView.id} customView={customView} />
      ))}
    </>
  );
}

export default CustomViewList;
