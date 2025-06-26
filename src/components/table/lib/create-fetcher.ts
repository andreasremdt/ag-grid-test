import type { FilterModel, IServerSideGetRowsRequest } from "ag-grid-community";
import httpFetcher from "@/lib/http-fetcher";
import transformFilterModel from "./transform-filter-model";
import transformSortModel from "./transform-sort-model";

export interface AgGridFetcher {
  getData: <T>(
    request: ServerSideRequest,
    submissionId?: string
  ) => Promise<ServerSideResponse<T>>;
}

interface ServerSideRequest extends IServerSideGetRowsRequest {
  filterType?: string;
}

type ServerSideResponse<T> =
  | {
      success: true;
      data: T | null;
    }
  | {
      success: false;
      error: string;
    };

const extendFilterModelWithSubmissionId = (
  submissionId?: string,
  model: FilterModel | null = {}
): FilterModel | null => {
  if (!submissionId) {
    return model;
  }

  return {
    ...model,
    MDL_SUB_ID: {
      filter: submissionId,
      filterType: "text",
      type: "equals",
    },
  };
};

const createFetcher = (url: string): AgGridFetcher => ({
  getData: async <T>(
    request: ServerSideRequest,
    submissionId?: string
  ): Promise<ServerSideResponse<T>> => {
    const searchParams = new URLSearchParams(window.location.search);

    try {
      const data = await httpFetcher<T>(url, {
        method: "POST",
        body: JSON.stringify({
          ...request,
          quickFilterText: searchParams.get("s") || undefined,
          filterModel: transformFilterModel(
            extendFilterModelWithSubmissionId(submissionId, request.filterModel)
          ),
          sortModel: transformSortModel(request.sortModel),
        }),
      });

      return { success: true, data };
    } catch (ex) {
      return { success: false, error: (ex as Error).message };
    }
  },
});

export default createFetcher;
