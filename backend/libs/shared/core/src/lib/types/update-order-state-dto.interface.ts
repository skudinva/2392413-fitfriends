import { Order } from './order.interface';

export interface IUpdateOrderStateDto
  extends Pick<Order, 'trainingId' | 'userId'> {
  state: 'start' | 'finish';
}
