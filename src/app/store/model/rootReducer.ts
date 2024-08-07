import { Reducer, combineReducers } from "@reduxjs/toolkit";
import { RootState } from "./store.model";
import { userReducer } from "@entities/User";
import { notificationsReducer } from "@entities/Notifications";
import { filtersReducer } from "@entities/Filters/model/Filters.slice";
import { sortByReducer } from "@entities/SortBy/model/SortBy.slice";
import {selectedApplicationReducer} from "@entities/SelectedApplication/model/SelectedApplication.slice";
import {documentsListReducer} from "@features/DocsList/model/DocsList.slice";

export const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  filters: filtersReducer,
  sortBy: sortByReducer,
  selectedApplication: selectedApplicationReducer,
  documents: documentsListReducer,
});

