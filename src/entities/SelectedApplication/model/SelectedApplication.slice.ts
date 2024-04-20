import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { SelectedApplicationState} from './SelectedApplication.model';
import { ApplicationModel } from "@entities/Application/model/application.model";

const initialState: SelectedApplicationState = {
  selectedApplication: [
    /* {
      "id": "9bd7fc1a-68d5-4050-aa43-6cc0a352e4ae",
      "created_at": "19.04.24",
      "deadlines": "22.04.24-27.04.24",
      "distance": 5678,
      "crop": "\u042f\u0447\u043c\u0435\u043d\u044c",
      "tariff": 213,
      "volume": 123,
      "load_place_name": "\u0433 \u0420\u043e\u0441\u0442\u043e\u0432-\u043d\u0430-\u0414\u043e\u043d\u0443, \u0423\u043d\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u0441\u043a\u0438\u0439 \u043f\u0435\u0440, \u0434 65",
      "unload_place_name": "\u0414\u043e\u043d\u0435\u0446\u043a\u0430\u044f \u041d\u0430\u0440\u043e\u0434\u043d\u0430\u044f \u0440\u0435\u0441\u043f, \u0433 \u0414\u043e\u043d\u0435\u0446\u043a, \u0443\u043b \u0421\u043c\u043e\u043b\u044c\u043d\u0430\u044f, \u0434 6",
      "order_number": 21,
      "load_coordinates": {
        "x": "39.726986",
        "y": "47.226437"
      },
      "unload_coordinates": {
        "x": "37.803",
        "y": "48.016"
      }
    } */
  ]
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