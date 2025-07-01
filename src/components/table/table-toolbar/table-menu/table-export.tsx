import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./table-export.module.css";
import useTableState from "../../hooks/use-table-state";

const options = [
  {
    label: "MS Excel .xlsx file",
    value: "excel",
  },
  {
    label: "CSV with , as a separator",
    value: "csv-comma",
  },
  {
    label: "CSV with | as a separator",
    value: "csv-pipe",
  },
];

function TableExport() {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);
  const { api } = useTableState();

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  function onExport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const type = formData.get("type") as string;
    const fileName = formData.get("filename") as string;

    if (type === "excel") {
      api?.exportDataAsExcel({ fileName });
    } else if (type === "csv-comma") {
      api?.exportDataAsCsv({ fileName });
    } else if (type === "csv-pipe") {
      api?.exportDataAsCsv({ fileName, columnSeparator: "|" });
    }

    setOpen(false);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Download
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        className={styles.dialog}
      >
        <p>
          You are about to export data structure and data to csv. Please enter
          the desired filename and press the &quot;Export data&quot; button.
        </p>

        <form onSubmit={onExport}>
          <input type="text" placeholder="Test" name="filename" />

          <select name="type">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button type="submit">Export data</button>
        </form>
      </dialog>
    </>
  );
}

export default TableExport;
