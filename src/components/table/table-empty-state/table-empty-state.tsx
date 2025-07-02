import type { CustomCellRendererProps } from "ag-grid-react";
import { useMemo, type FC } from "react";
import styles from "./table-empty-state.module.css";
import type { TableEmptyState } from "../lib/types";

type Props = CustomCellRendererProps & TableEmptyState;

const TableEmptyState: FC<Props> = ({ api, title, description, filters }) => {
  const hasFilters = Object.keys(api.getFilterModel()).length > 0;

  const texts = useMemo(() => {
    if (hasFilters) {
      return {
        title: filters?.title || "No results found.",
        description:
          filters?.description ||
          "Try adjusting your search or filter options if you have any.",
      };
    }

    return {
      title: title || "No results found.",
      description: description || "No data is available for this table.",
    };
  }, [hasFilters, filters, title, description]);

  return (
    <>
      <p>{texts.title}</p>
      <p>{texts.description}</p>

      {filters?.reset && hasFilters ? (
        <button
          type="button"
          className={styles.button}
          onClick={() => api.setFilterModel({})}
        >
          Reset filters
        </button>
      ) : null}
    </>
  );
};

export default TableEmptyState;
