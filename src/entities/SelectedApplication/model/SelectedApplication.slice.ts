import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { SelectedApplicationState} from './SelectedApplication.model';
import { ApplicationModel } from "@entities/Application/model/application.model";

const initialState: SelectedApplicationState = {
  selectedApplication: []
};

const SelectedApplicationSlice = createSlice({
  name: "selectedApplication",
  initialState,
  reducers: {
    setSelectedApplication(state, { payload }: PayloadAction<ApplicationModel>) {
      return { selectedApplication: [payload] }
    },
    clearSelectedApplication() {
      return {selectedApplication: []}
    },
  },
});

export const { setSelectedApplication, clearSelectedApplication } = SelectedApplicationSlice.actions;

export const selectedApplicationReducer = SelectedApplicationSlice.reducer;