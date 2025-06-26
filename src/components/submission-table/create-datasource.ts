import type {
  IServerSideDatasource,
  IServerSideGetRowsRequest,
} from "ag-grid-community";
import type { AgGridFetcher } from "@/components/table";
import type { Aggregate } from "./types";

interface FacetBody {
  count: number;
  facets: { [key: string]: number };
}

interface FacetData {
  [x: string]: string | number;
  id: string;
  sub_id: string;
  childCount: number;
}

const isFacet = (data: Aggregate[] | FacetBody): data is FacetBody =>
  typeof data === "object" && "facets" in data;

const isEmpty = (data: Aggregate[] | FacetBody | null): data is null => {
  if (!data) return true;

  if (isFacet(data)) {
    return data.count === 0 || Object.keys(data.facets).length === 0;
  }

  return data.length === 0;
};

const getFacetData = (
  data: FacetBody,
  request: IServerSideGetRowsRequest
): FacetData[] => {
  const { rowGroupCols, groupKeys } = request;

  return Object.keys(data.facets).map((key) => ({
    [`${rowGroupCols[groupKeys.length].id}`]: key,
    id: key,
    sub_id: key,
    childCount: data.facets[key],
  }));
};

const createDatasource = (fetcher: AgGridFetcher): IServerSideDatasource => ({
  getRows: async ({ request, api, success, fail }): Promise<void> => {
    api.hideOverlay();

    const response = await fetcher.getData<Aggregate[] | FacetBody>(request);

    if (!response.success) {
      fail();
      return;
    }

    if (isEmpty(response.data)) {
      api.showNoRowsOverlay();
      success({ rowData: [] });
      return;
    }

    if (isFacet(response.data)) {
      const data = getFacetData(response.data, request);

      success({ rowData: data, rowCount: data.length });
    } else {
      success({ rowData: response.data || [] });
    }
  },
});

export default createDatasource;
