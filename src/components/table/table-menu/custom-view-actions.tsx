import useInlineEditable from "@/hooks/use-inline-editable";
import useTableCustomViews from "../hooks/use-table-custom-views";
import styles from "./table-menu.module.css";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function CustomViewActions({ children }: Props) {
  const {
    modified,
    activeCustomView,
    resetGridState,
    createCustomView,
    saveCustomView,
  } = useTableCustomViews();

  const { editing, onStartEditing, onSubmit, onKeyDown } =
    useInlineEditable(createCustomView);

  return (
    <>
      <h3 className={styles.separator}>Custom view actions</h3>
      {children}

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
          disabled={!modified}
          onClick={onStartEditing}
        >
          Add new custom view
        </button>
      )}
      <button
        className={styles.button}
        type="button"
        disabled={!modified || !activeCustomView}
        onClick={saveCustomView}
      >
        Save new changes
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={resetGridState}
        disabled={!modified}
      >
        Reset custom view
      </button>
    </>
  );
}

export default CustomViewActions;
