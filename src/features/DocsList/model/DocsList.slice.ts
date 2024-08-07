import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '@shared/lib/api';
import {DocsListState} from "@features/DocsList/model/DocsList.model";
import {DocumentOnSign} from "@entities/Document/model/document.model";
import {store} from "@src/app/store";

export const fetchDocuments = createAsyncThunk(
  "docsList/fetchDocuments",
  async (_, { getState }) => {
    //@ts-ignore
    const token = getState().user.token;
    if (!token) return;
    const data = await getData<DocumentOnSign[]>({
      url: '/api/v1/files/on-signing',
      headers: { Authorization: `Bearer ${token}` },
      dataFlag: true,
    })

    return data;
  }
)

const initialState: DocsListState = {
  documents: [],
  isDocsDataError: false,
  isDocsDataLoading: false,
};

const docsListSlice = createSlice({
  name: "docsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        return { ...state, isDocsDataError: false, isDocsDataLoading: true }
      })
      .addCase(fetchDocuments.fulfilled, (state, { payload }) => {
        return { ...state, documents: payload, isDocsDataLoading: false, isDocsDataError: false }
      })
      .addCase(fetchDocuments.rejected, (state) => {
        return { ...state, isDocsDataError: true, isDocsDataLoading: false }
      })
  },
});

// export const {  } = docsListSlice.actions;

export const documentsListReducer = docsListSlice.reducer;