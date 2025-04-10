import { OrderType } from './order-type.enum';
import { PayType } from './pay-type.enum';

export interface Order {
  id: number;
  type: OrderType;
  trainingId: number;
  userId: string;
  price: number;
  amount: number;
  totalPrice: number;
  paymentType: PayType;
  createdAt: Date;
}
