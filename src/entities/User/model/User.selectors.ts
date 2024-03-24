import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectUserState = (state: RootState) => state.user;

const selectToken = createSelector(selectUserState, (state) => state.token);

const selectUserData = createSelector(selectUserState, (state) => state.user);

export const UserSelectors = {
    selectToken,
    selectUserData
}