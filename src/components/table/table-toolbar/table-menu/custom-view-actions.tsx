import useInlineEditable from "@/hooks/use-inline-editable";
import useTableCustomViews from "../../hooks/use-table-custom-views";
import styles from "./table-menu.module.css";

type Props = {
  onShowCustomViewsList: () => void;
};

function CustomViewActions({ onShowCustomViewsList }: Props) {
  const {
    tableProps,
    customViews,
    resetGridState,
    createCustomView,
    saveCustomView,
  } = useTableCustomViews();

  const { editing, onStartEditing, onSubmit, onKeyDown } =
    useInlineEditable(createCustomView);

  return (
    <>
      <h3 className={styles.separator}>Custom view actions</h3>

      {tableProps.customViewsLayout === "dropdown" ? (
        <button
          className={styles.button}
          type="button"
          onClick={onShowCustomViewsList}
        >
          Change custom view
        </button>
      ) : null}

      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Untitled custom view"
            onKeyDown={onKeyDown}
            autoFocus
            name="title"
          />
          <button type="submit">Ok</button>
        </form>
      ) : (
        <button
          className={styles.button}
          type="button"
          disabled={!customViews.modified}
          onClick={onStartEditing}
        >
          Add new custom view
        </button>
      )}
      <button
        className={styles.button}
        type="button"
        disabled={!customViews.modified || !customViews.activeView}
        onClick={saveCustomView}
      >
        Save new changes
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={resetGridState}
        disabled={!customViews.modified}
      >
        Reset custom view
      </button>
    </>
  );
}

export default CustomViewActions;
