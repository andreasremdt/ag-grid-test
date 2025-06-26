import type { SortModelItem } from 'ag-grid-community';

const transformSortModel = (sortModelItems: SortModelItem[]): SortModelItem[] => {
  const keys: string[] = [];
  const transformedSortModelItems: SortModelItem[] = [];

  sortModelItems.forEach((sortItem) => {
    const colId = sortItem.colId.endsWith('_1') ? sortItem.colId.slice(0, -2) : sortItem.colId;

    if (keys.includes(colId)) {
      return;
    }

    transformedSortModelItems.push({
      ...sortItem,
      colId,
    });
    keys.push(colId);
  });

  return transformedSortModelItems;
};

export default transformSortModel;
