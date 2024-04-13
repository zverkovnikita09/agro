import { Reducer, combineReducers } from "@reduxjs/toolkit";
import { RootState } from "./store.model";
import { userReducer } from "@entities/User";
import { notificationsReducer } from "@entities/Notifications";
import { filtersReducer } from "@entities/Filters/model/Filters.slice";

export const rootReducer: Reducer<RootState> = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
  filters: filtersReducer
});