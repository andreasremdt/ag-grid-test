import { useState, type KeyboardEvent, ChangeEvent, useCallback } from "react";
import useTableState from "./hooks/use-table-state";
import { useSearchParams } from "next/navigation";
import { debounce } from "@/lib/utils";

function TableQuickFilter() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>(() => searchParams.get("s") || "");

  const { tableProps, api } = useTableState();

  const debouncedSearchChange = useCallback(debounce(updateGrid, 500), []);

  function updateGrid(quickFilterText: string) {
    const url = new URL(window.location.href);

    if (quickFilterText && quickFilterText.length > 0) {
      url.searchParams.set("s", quickFilterText);
    } else {
      url.searchParams.delete("s");
    }

    window.history.replaceState(null, "", url.toString());
    api?.refreshServerSide({ purge: true });
  }

  function close() {
    if (value.length > 0) {
      setValue("");
      updateGrid("");
    }

    setVisible(false);
  }

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    setValue(target.value);
    debouncedSearchChange(target.value);
  }

  function onKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === "Escape" && visible) {
      close();
    }
  }

  if (!tableProps.quickFilter) {
    return null;
  }

  return (
    <div>
      {visible ? (
        <>
          <input
            placeholder={tableProps.quickFilter}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoFocus
          />

          <button type="button" onClick={close}>
            &times;
          </button>
        </>
      ) : (
        <button
          onClick={() => setVisible(true)}
          aria-label="Expand table search"
        >
          Search
        </button>
      )}
    </div>
  );
}

export default TableQuickFilter;
