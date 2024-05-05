import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LSKeys } from '@shared/lib/globalVariables';
import { User, UserState } from './User.model';
import { getData } from '@shared/lib/api';

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const token = JSON.parse(localStorage.getItem(LSKeys.TOKEN) as string) ?? null
    if (!token) return;
    const data = await getData<{ user: User }>({
      url: "/api/v1/user",
      headers: { Authorization: `Bearer ${token}` },
      dataFlag: true,
    })

    return data.user
  }
)

const initialState: UserState = {
  token: JSON.parse(localStorage.getItem(LSKeys.TOKEN) as string) ?? null,
  user: null,
  isUserDataLoading: false,
  isUserDataError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      return { ...state, token: payload }
    },
    setUser(state, { payload }) {
      return { ...state, user: payload, isUserDataLoading: false, isUserDataError: false }
    },
    removeUserData() {
      return { token: null, user: null, isUserDataError: false, isUserDataLoading: false }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        return { ...state, isUserDataError: false, isUserDataLoading: true }
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        return { ...state, user: payload, isUserDataLoading: false }
      })
      .addCase(fetchUserData.rejected, (state) => {
        return { ...state, isUserDataError: true, isUserDataLoading: false }
      })
  },
});

export const { removeUserData, setToken, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;