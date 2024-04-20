export interface Coord {
  x: string | number;
  y: string | number;
}

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
  scale_length: number;
  height_limit: number;
  is_overload: number;
  timeslot: string;
  outage_begin?: number;
  outage_price?: number;
  daily_load_rate?: number;
  contact_name: string;
  contact_phone: string;
  cargo_shortage_rate?: number;
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
  load_place_name: string;
  unload_place_name: string;
  load_coordinates: Coord;
  unload_coordinates: Coord;
  cargo_weight: number;
  description?: string;
  load_types: string[];
  order_number: number;
  is_full_charter?: number;
  unload_methods?: string[];
  created_at?: string;
}