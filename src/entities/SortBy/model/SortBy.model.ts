
export enum SortByValues {
  DEFAULT = '',
  TARIFF_ORDER_ASC = 'tariff',
  TARIFF_ORDER_DESC = '-tariff',
  DISTANCE_ORDER_ASC = 'distance',
  DISTANCE_ORDER_DESC = '-distance'
}

export const sortByNames: Record<SortByValues, string> = {
  [SortByValues.DEFAULT]: 'По умолчанию',
  [SortByValues.DISTANCE_ORDER_ASC]: 'Сначала с меньшей дистанцией',
  [SortByValues.DISTANCE_ORDER_DESC]: 'Сначала с большей дистанцией',
  [SortByValues.TARIFF_ORDER_ASC]: 'Сначала дешевле',
  [SortByValues.TARIFF_ORDER_DESC]: 'Сначала дороже'
}

export interface SortByState {
  sortByValue: SortByValues;
}
