import type { FilterModel } from 'ag-grid-community';

const transformFilterModel = (filterModel: FilterModel | null): FilterModel => {
  const newFilterModel: FilterModel = {};

  if (!filterModel) {
    return newFilterModel;
  }

  Object.entries(filterModel).forEach(([key, value]) => {
    if (key.endsWith('_1')) {
      newFilterModel[key.slice(0, -2)] = value;
    } else {
      newFilterModel[key] = value;
    }
  });

  return newFilterModel;
};

export default transformFilterModel;
