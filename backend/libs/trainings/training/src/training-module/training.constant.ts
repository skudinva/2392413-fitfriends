import { SortDirection, SortType } from '@backend/shared/core';

export const DEFAULT_TRAINING_COUNT_LIMIT = 6;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = SortType.Date;
export const DEFAULT_PAGE = 1;

export const TrainingResponse = {
  TrainingCreated: 'New training created',
  TrainingUpdated: 'Training updated',
  Unauthorized: 'Need authorization',
  TrainingsFound: 'Trainings found',
  TrainingFound: 'Training found',
  TrainingNotFound: 'Training not found',
  AccessDeny: 'AccessDeny',
  TrainingDeleted: 'Training deleted',
};
