import useTableCustomViews from "../../hooks/use-table-custom-views";
import TableCustomViewEntry from "../table-custom-view-entry";
import styles from "./table-menu.module.css";

type Props = {
  onHideCustomViewsList: () => void;
};

function CustomViewList({ onHideCustomViewsList }: Props) {
  const { tableProps, switchCustomView } = useTableCustomViews();

  return (
    <>
      <button type="button" onClick={onHideCustomViewsList}>
        Back
      </button>

      <h3 className={styles.separator}>Change custom view</h3>

      <button
        type="button"
        onClick={() => {
          switchCustomView();
          onHideCustomViewsList();
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
