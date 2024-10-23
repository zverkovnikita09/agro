import { ApplicationModel } from "@entities/Application/model/application.model"

export interface Filters extends Pick<
  Partial<ApplicationModel>,
  "load_types" | "is_overload" | "scale_length" | "clarification_of_the_weekend" | "is_full_charter" | "height_limit" | "manager_id"
> {
  distance_from?: number
  distance_to?: number
  load_region?: string[]
  unload_region?: string[]
  load_city?: string[]
  unload_city?: string[]
  crop?: string[]
  with_nds?: number
  tariff_from?: number
  tariff_to?: number
  timeslot?: string[]
  load_method?: string[]
  unload_methods?: string[]
}

export interface FiltersState {
  filters: Filters
}