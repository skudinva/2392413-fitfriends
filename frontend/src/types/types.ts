import { ORDER_TYPES, PAY_TYPES, Sorting } from '../const';

export type OrderType = (typeof ORDER_TYPES)[number];
export type PayType = (typeof PAY_TYPES)[number];
export type SortName = keyof typeof Sorting;
