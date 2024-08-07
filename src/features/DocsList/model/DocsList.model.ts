import {DocumentOnSign} from "@entities/Document/model/document.model";

export interface DocsListState {
  documents?: DocumentOnSign[];
  isDocsDataError: boolean;
  isDocsDataLoading: boolean;
}