import { ApplicationModel } from "@entities/Application/model/application.model"

export interface Filters extends Pick<
  Partial<ApplicationModel>,
  "load_types" | "load_method" | "is_overload" | "scale_length" | "clarification_of_the_weekend" | "unload_method" | "is_full_charter" | "crop" | "height_limit"
> {
  distance_from?: number
  distance_to?: number
  load_region?: string
  unload_region?: string
  //новые территории
  //цена с ндс/без
  tariff_from?: number
  tariff_to?: number
  timeslot?: string[]
}

export interface FiltersState {
  filters: Filters
}