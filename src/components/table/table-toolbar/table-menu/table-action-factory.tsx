import TableExport from "./table-export";

function tableActionFactory(action: string) {
  switch (action) {
    case "export":
      return <TableExport />;
    default:
      return null;
  }
}

export default tableActionFactory;
