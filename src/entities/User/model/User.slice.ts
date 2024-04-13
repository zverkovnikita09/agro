import { createSlice } from '@reduxjs/toolkit';
import { LSKeys } from '@shared/lib/globalVariables';
import { UserState } from './User.model';

const initialState: UserState = {
  token: JSON.parse(localStorage.getItem(LSKeys.TOKEN) as string) ?? null,
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      return { ...state, user: payload }
    },
    setToken(state, { payload }) {
      return { ...state, token: payload }
    },
    removeUserData() {
      return { token: null, user: null }
    }
  },
});

export const { removeUserData, setToken, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;