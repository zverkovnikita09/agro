import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "@src/app/store";
import {Role} from "@entities/User";

const selectUserState = (state: RootState) => state.user;

const selectToken = createSelector(selectUserState, (state) => state.token);

const selectUserData = createSelector(selectUserState, (state) => state.user);
const selectIsUserDataLoading = createSelector(selectUserState, (state) => state.isUserDataLoading);
const selectIsUserDataError = createSelector(selectUserState, (state) => state.isUserDataError);

const selectUserRole = createSelector(selectUserData, (state) => {
    return state?.roles?.find((role)=> role.slug === 'logistician')?.slug ?? Role.CLIENT;
})

const selectUserId = createSelector(selectUserData, (state) => state?.id);

export const UserSelectors = {
    selectToken,
    selectUserData,
    selectUserRole,
    selectIsUserDataLoading,
    selectIsUserDataError,
    selectUserId,
}