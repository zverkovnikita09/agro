import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectSortByState = (state: RootState) => state.sortBy;

const selectSortByValue = createSelector(selectSortByState, (state) => state.sortByValue);


export const SortBySelectors = {
  selectSortByValue
}