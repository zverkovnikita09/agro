import { Reducer, combineReducers } from "@reduxjs/toolkit";
import { RootState } from "./store.model";
import { userReduser } from "@entities/User";
import { notificationsReduser } from "@entities/Notifications";

export const rootReducer: Reducer<RootState> = combineReducers({
    user: userReduser,
    notifications: notificationsReduser
  });