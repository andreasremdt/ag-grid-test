import { useId, useState } from "react";
import styles from "./table-menu.module.css";
import TableSettings from "./table-settings";
import CustomViewActions from "./custom-view-actions";
import CustomViewList from "./custom-view-list";
import TableActions from "./table-actions";

function TableMenu() {
  const id = useId();
  const [listCustomViews, setListCustomViews] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <button popoverTarget={id} type="button" className={styles.toggle}>
        Menu
      </button>

      <div id={id} popover="auto" className={styles.popover}>
        {listCustomViews ? (
          <CustomViewList>
            <button type="button" onClick={() => setListCustomViews(false)}>
              Back
            </button>
          </CustomViewList>
        ) : (
          <>
            <CustomViewActions>
              <button
                className={styles.button}
                type="button"
                onClick={() => setListCustomViews(true)}
              >
                Change custom view
              </button>
            </CustomViewActions>

            <TableActions />

            <TableSettings />
          </>
        )}
      </div>
    </div>
  );
}

export default TableMenu;
