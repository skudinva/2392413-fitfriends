import { SortDirection, SortType } from '@backend/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = SortType.DATE;
export const DEFAULT_PAGE_COUNT = 1;

export const TrainingPostResponse = {
  PostCreated: 'New training created',
  PostUpdated: 'Training updated',
  Like: 'Add like',
  UnLike: 'Remove like',
  LikeAlreadyExists: 'Like already exist',
  LikeNotExists: 'Like not exists',
  Unauthorized: 'Need authorization',
  PostsFound: 'Posts found',
  PostFound: 'Training found',
  PostNotFound: 'Training not found',
  AccessDeny: 'AccessDeny',
  PostDeleted: 'Training deleted',
};
