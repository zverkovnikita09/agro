import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectSelectedApplicationState = (state: RootState) => state.selectedApplication;

const selectSelectedApplication = createSelector(selectSelectedApplicationState, (state) => state.selectedApplication);

export const SelectedApplicationSelectors = {
  selectSelectedApplication,
}