import useTableState from "../hooks/use-table-state";

function TableSelectionControls() {
  const { rowSelection, tableProps } = useTableState();

  if (rowSelection.length === 0 || !tableProps.getSelectionOptions) {
    return null;
  }

  return (
    <div>
      {tableProps.getSelectionOptions(rowSelection).map((option) => (
        <button
          type="button"
          title={option.title}
          key={option.icon}
          onClick={option.callback}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

export default TableSelectionControls;
