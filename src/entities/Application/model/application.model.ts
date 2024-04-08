export interface ApplicationModel {
  id: string;
  crop: string;
  volume: number;
  distance: number;
  tariff: number;
  deadlines: string;
  nds_percent?: number;
  terminal_name: string;
  terminal_address: string;
  terminal_inn: string;
  exporter_name: string;
  exporter_inn: string;
  is_semi_truck: boolean;
  is_tonar: boolean;
  scale_length: number;
  height_limit: number;
  is_overload: boolean;
  timeslot: string;
  outage_begin?: number | null;
  outage_price?: number;
  daily_load_rate?: number;
  contact_name: string;
  contact_phone: string;
  cargo_shortrage_rate?: number;
  cargo_shortage_rate: number;
  unit_of_measurement_for_cargo_shortage_rate?: "кг" | "%";
  cargo_price?: number;
  load_place: string;
  approach?: string;
  work_time?: string;
  clarification_of_the_weekend?: string;
  loader_power?: number;
  load_method: string;
  tolerance_to_the_norm?: number;
  start_order_at?: string;
  end_order_at?: string;
  load_latitude: string;
  load_longitude: string;
  unload_latitude: string;
  unload_longitude: string;
  load_place_name: string;
  unload_place_name: string;
  cargo_weight: number;
  description?: string;
  load_types: string[];
  order_number: number;
  is_full_charter?: number;
  unload_method?: string;
}