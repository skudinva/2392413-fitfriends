import { Order } from './order.interface';

export type ICreateOrderDto = Omit<
  Order,
  'id' | 'createdAt' | 'isStarted' | 'doneCount' | 'isDone'
>;
