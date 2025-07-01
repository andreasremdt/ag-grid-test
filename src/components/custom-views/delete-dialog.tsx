import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import styles from "./delete-dialog.module.css";

type Props = ComponentPropsWithoutRef<"dialog"> & {
  onCancel: () => void;
  onConfirm: () => void;
};

function DeleteDialog({ open, onCancel, onConfirm, ...props }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} onClose={onCancel} className={styles.dialog} {...props}>
      <p>Are you sure that you want to delete this custom view?</p>

      <footer>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={onConfirm}>
          Delete
        </button>
      </footer>
    </dialog>
  );
}

export default DeleteDialog;
