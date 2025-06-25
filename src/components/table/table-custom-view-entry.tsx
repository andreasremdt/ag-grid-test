import { useState } from "react";
import DeleteDialog from "../custom-views/delete-dialog";
import useTableCustomViews from "./hooks/use-table-custom-views";
import type { CustomView } from "./lib/types";
import useInlineEditable from "@/hooks/use-inline-editable";

type Props = {
  customView: CustomView;
};

function TableCustomViewEntry({ customView }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const {
    switchCustomView,
    saveCustomView,
    renameCustomView,
    activeCustomView,
    tableProps,
    modified,
  } = useTableCustomViews();

  const { editing, onStartEditing, onSubmit, onKeyDown } = useInlineEditable(
    (title) => renameCustomView({ ...customView, title })
  );

  const isSaveButtonDisabled =
    customView.id === activeCustomView?.id ? !modified : true;

  if (editing) {
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={customView.title}
          onKeyDown={onKeyDown}
          autoFocus
          name="title"
        />
        <button type="submit">Ok</button>
      </form>
    );
  }

  return (
    <div key={customView.id}>
      <button
        type="button"
        onClick={() => {
          switchCustomView(customView);
          tableProps.onSelectCustomView?.(customView);
        }}
      >
        {customView.title}
      </button>
      <button type="button" onClick={() => setDeleteDialogOpen(true)}>
        Delete
      </button>

      <button type="button" onClick={onStartEditing}>
        Rename
      </button>

      <button
        disabled={isSaveButtonDisabled}
        type="button"
        onClick={saveCustomView}
      >
        Save
      </button>

      <DeleteDialog
        open={deleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          setDeleteDialogOpen(false);
          switchCustomView();
          tableProps.onDeleteCustomView?.(customView);
        }}
      />
    </div>
  );
}

export default TableCustomViewEntry;
