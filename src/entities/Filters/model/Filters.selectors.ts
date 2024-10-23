import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectFiltersState = (state: RootState) => state.filters;

const selectAllFilters = createSelector(selectFiltersState, (state) => state.filters);

export const FiltersSelectors = {
  selectAllFilters,
}