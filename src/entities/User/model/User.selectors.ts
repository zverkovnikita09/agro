import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectUserState = (state: RootState) => state.user;

const selectToken = createSelector(selectUserState, (state) => state.token);

const selectUserData = createSelector(selectUserState, (state) => state.user);
const selectIsUserDataLoading = createSelector(selectUserState, (state) => state.isUserDataLoading);
const selectIsUserDataError = createSelector(selectUserState, (state) => state.isUserDataError);

const selectUserRole = createSelector(selectUserData, (state) => state?.roles?.[0]?.slug)

export const UserSelectors = {
    selectToken,
    selectUserData,
    selectUserRole,
    selectIsUserDataLoading,
    selectIsUserDataError
}