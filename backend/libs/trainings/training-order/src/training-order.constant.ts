import { SortDirection } from '@backend/shared/core';

export const MAX_ORDERS_COUNT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE = 1;

export const TrainingOrderValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid author id',
} as const;

export const TrainingOrderResponse = {
  OrdersFound: 'Successfully found orders of the post',
  OrderCreated: 'Successfully create order',
  OrderDeleted: 'Successfully delete order',
  TrainingNotFound: 'Training not found',
  OrderNotFound: 'Order not found',
  NotAllowed: 'You are not allowed to delete this order',
} as const;
