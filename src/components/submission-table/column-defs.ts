import type { ColDef } from "ag-grid-community";
import type { Aggregate } from "./types";

const columnDefs: ColDef<Aggregate>[] = [
  {
    field: "sub_id",
    headerName: "Submission ID",
    filter: "agTextColumnFilter",
    tooltipField: "sub_id",
  },
  {
    field: "prv_id",
    headerName: "Provider (Code)",
    filter: "agSetColumnFilter",
  },
  {
    field: "prv_id",
    headerName: "Provider",
    enableRowGroup: false,
    filter: "agSetColumnFilter",
    hide: true,
  },
  {
    field: "rep_df",
    headerName: "Source",
    filter: "agTextColumnFilter",
    tooltipField: "rep_df",
  },
  {
    field: "tgt_df",
    headerName: "Target",
    filter: "agTextColumnFilter",
    hide: true,
  },
  {
    field: "status",
    headerName: "Status",
  },
  {
    field: "status",
    headerName: "Latest event",
    filter: "agSetColumnFilter",
    hide: false,
  },
  {
    field: "rcp_ts",
    headerName: "Reception",
  },
  {
    field: "arc_ts",
    headerName: "Archival",
    hide: true,
  },
  {
    field: "nrm_ts",
    headerName: "Normalization",
    hide: true,
  },
  {
    field: "int_ts",
    headerName: "Integration",
    hide: true,
  },
  {
    field: "rep_beg",
    headerName: "Begin",
    filter: "agTextColumnFilter",
    hide: true,
  },
  {
    field: "rep_end",
    headerName: "End",
    filter: "agTextColumnFilter",
    hide: true,
  },
  {
    field: "phase",
    headerName: "Phase (Code)",
    filter: "agSetColumnFilter",
  },
  {
    field: "phase",
    headerName: "Phase",
    enableRowGroup: false,
    filter: "agSetColumnFilter",
    hide: true,
  },
  {
    field: "orig_fname",
    headerName: "Original filename",
    filter: "agSetColumnFilter",
    hide: true,
  },
  {
    field: "num_obs",
    headerName: "Observations",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "num_ser",
    headerName: "Series",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "num_set",
    headerName: "Data sets",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "num_grp",
    headerName: "Groups",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "int_new",
    headerName: "New",
    columnGroupShow: "closed",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "int_upd",
    headerName: "Updated",
    columnGroupShow: "closed",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "int_del",
    headerName: "Deleted",
    columnGroupShow: "closed",
    filter: "agNumberColumnFilter",
    hide: true,
  },
  {
    field: "has_inv",
    headerName: "Invalid data",
    cellDataType: "boolean",
    hide: true,
  },
  {
    field: "has_unm",
    headerName: "Unmapped data",
    cellDataType: "boolean",
    hide: true,
  },
  {
    field: "format",
    headerName: "Format",
    filter: "agSetColumnFilter",
    hide: true,
  },
  {
    field: "action",
    headerName: "Integration mode (Code)",
    filter: "agSetColumnFilter",
    hide: true,
  },
  {
    field: "action",
    headerName: "Integration mode",
    enableRowGroup: false,
    filter: "agSetColumnFilter",
    hide: true,
  },
];

export default columnDefs;
