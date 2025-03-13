import { ORDER_TYPES, PAY_TYPES, Sorting, TRAINING_DURATIONS } from '../const';

export type TrainingDuration = (typeof TRAINING_DURATIONS)[number];
export type OrderType = (typeof ORDER_TYPES)[number];
export type PayType = (typeof PAY_TYPES)[number];
export type SortName = keyof typeof Sorting;
