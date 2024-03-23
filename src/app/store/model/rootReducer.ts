import { Reducer, combineReducers } from "@reduxjs/toolkit";
import { RootState } from "./store.model";
import { userReduser } from "@entities/User/model/User.slice";

export const rootReducer: Reducer<RootState> = combineReducers({
    user: userReduser
  });