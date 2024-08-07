import {RootState} from "@src/app/store";
import {createSelector} from "@reduxjs/toolkit";

const selectDocumentsState = (state: RootState) => state.documents;

const selectDocumentsData = createSelector(selectDocumentsState, (state) => state.documents);
const selectIsDocumentsDataLoading = createSelector(selectDocumentsState, (state) => state.isDocsDataLoading);
const selectIsDocumentsDataError = createSelector(selectDocumentsState, (state) => state.isDocsDataError);

export const DocsListSelectors = {
  selectDocumentsData,
  selectIsDocumentsDataError,
  selectIsDocumentsDataLoading
}