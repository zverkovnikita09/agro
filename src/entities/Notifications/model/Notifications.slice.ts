import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationType, NotificationsState } from './Notifications.model';

const initialState: NotificationsState = {
  notifications: []
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, { payload: { message, type, timeout } }: PayloadAction<{ message: string, type: NotificationType, timeout?: number }>) {
      const id = performance.now().toString();
      return { ...state, notifications: [...state.notifications, { id, message, type, timeout }] }
    },
    removeNotification(state, { payload: id }) {
      return { ...state, notifications: state.notifications.filter(item => item.id !== id) }
    },
  },
});

export const { addNotification, removeNotification, } = notificationsSlice.actions;

export const notificationsReducer = notificationsSlice.reducer;