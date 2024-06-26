import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Filters, FiltersState } from './Filters.model';
import { LSKeys } from '@shared/lib/globalVariables';

const initialFiltersValue: Filters = {
  clarification_of_the_weekend: undefined,
  crop: undefined,
  distance_from: undefined,
  distance_to: undefined,
  is_full_charter: undefined,
  is_overload: undefined,
  load_method: undefined,
  load_region: undefined,
  load_types: undefined,
  scale_length: undefined,
  tariff_from: undefined,
  tariff_to: undefined,
  timeslot: undefined,
  unload_methods: undefined,
  unload_region: undefined
}

const initialState: FiltersState = {
  filters: JSON.parse(localStorage.getItem(LSKeys.FILTERS) as string) ?? initialFiltersValue,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, { payload }: PayloadAction<Filters>) {
      return { ...state, filters: payload }
    },
    clearFilters(state) {
      return { ...state, filters: initialFiltersValue };
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;