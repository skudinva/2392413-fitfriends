import { Order } from './order.interface';
import { Training } from './training.interface';

export type OrderWithTraining = Order & { training: Training };
