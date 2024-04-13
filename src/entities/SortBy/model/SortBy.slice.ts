import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SortByValues} from "@entities/SortBy";

const initialState = {
  sortByValue: SortByValues.DEFAULT
};

const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy(state, { payload }: PayloadAction<SortByValues>) {
      return { ...state, sortByValue: payload }
    },
  },
});

export const { setSortBy } = sortBySlice.actions;

export const sortByReducer = sortBySlice.reducer;