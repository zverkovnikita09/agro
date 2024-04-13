import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@src/app/store";

const selectFiltersState = (state: RootState) => state.filters;

const selectAllFilters = createSelector(selectFiltersState, (state) => state.filters);

/* const selectCrop = createSelector(selectAllFilters, (state) => state.crop);
const selectDistanceFrom = createSelector(selectAllFilters, (state) => state.distance_from);
const selectDistanceTo = createSelector(selectAllFilters, (state) => state.distance_to);
const selectClarificationOfTheWeekend = createSelector(selectAllFilters, (state) => state.clarification_of_the_weekend);
const selectIsFullCharter = createSelector(selectAllFilters, (state) => state.is_full_charter);
const selectIsOverload = createSelector(selectAllFilters, (state) => state.is_overload);
const selectLoadMethod = createSelector(selectAllFilters, (state) => state.load_method);
const selectLoadRegion = createSelector(selectAllFilters, (state) => state.load_region);
const selectLoadTypes = createSelector(selectAllFilters, (state) => state.load_types);
const selectScaleLength = createSelector(selectAllFilters, (state) => state.scale_length);
const selectTariffFrom = createSelector(selectAllFilters, (state) => state.tariff_from);
const selectTariffTo = createSelector(selectAllFilters, (state) => state.tariff_to);
const selectTimeslot = createSelector(selectAllFilters, (state) => state.timeslot);
const selectUnloadMethod = createSelector(selectAllFilters, (state) => state.unload_method);
const selectUnloadRegion = createSelector(selectAllFilters, (state) => state.unload_region); */

export const FiltersSelectors = {
  selectAllFilters,
  /*  selectCrop,
   selectDistanceFrom,
   selectDistanceTo,
   selectClarificationOfTheWeekend,
   selectIsFullCharter,
   selectIsOverload,
   selectLoadMethod,
   selectLoadRegion,
   selectLoadTypes,
   selectScaleLength,
   selectTariffFrom,
   selectTariffTo,
   selectTimeslot,
   selectUnloadMethod,
   selectUnloadRegion */
}