import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectNotificationsState = (state: RootState) => state.notifications;

const selectAllNotifications = createSelector(selectNotificationsState, (state) => state.notifications);

export const NotificationsSelectors = {
  selectAllNotifications,
}