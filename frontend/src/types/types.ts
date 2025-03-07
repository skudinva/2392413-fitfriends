import { LOCATIONS, ORDER_TYPES, PAY_TYPES, Sorting, TRAINING_DURATIONS, TRAINING_TYPES } from '../const'

export type LocationName = typeof LOCATIONS[number]
export type TrainingType = typeof TRAINING_TYPES[number]
export type TrainingDuration = typeof TRAINING_DURATIONS[number]
export type OrderType = typeof ORDER_TYPES[number]
export type PayType = typeof PAY_TYPES[number]
export type SortName = keyof typeof Sorting
