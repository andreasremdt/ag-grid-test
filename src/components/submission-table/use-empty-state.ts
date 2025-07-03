import { useMemo } from "react";
import type { TableEmptyState } from "../table";

function useEmptyState(bookmarks?: string[]) {
  return useMemo(
    (): TableEmptyState => ({
      title: bookmarks ? "No bookmarks yet" : "No submissions found",
      description: bookmarks
        ? "No bookmmarks description"
        : "No data is available for this dataset.",
      filters: {
        title: "No submissions found after filter",
        description:
          "Try adjusting your search or filter options if you have any.",
        reset: true,
      },
    }),
    [bookmarks]
  );
}

export default useEmptyState;
