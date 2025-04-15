import {
  Order,
  OrderType,
  PayType,
  PgEntity,
  StorableEntity,
} from '@backend/shared/core';

export class TrainingOrderEntity
  extends PgEntity
  implements StorableEntity<Order>
{
  public type!: OrderType;
  public trainingId!: number;
  public userId!: string;
  public price!: number;
  public amount!: number;
  public totalPrice!: number;
  public paymentType!: PayType;
  public isStarted: boolean;
  public doneCount: number;
  public isDone: boolean;
  public createdAt!: Date;

  constructor(order?: Order) {
    super();
    this.populate(order);
  }

  public populate(order?: Order): void {
    if (!order) {
      return;
    }

    this.id = order.id ?? undefined;
    this.type = order.type;
    this.trainingId = order.trainingId;
    this.userId = order.userId;
    this.price = order.price;
    this.amount = order.amount;
    this.totalPrice = order.totalPrice;
    this.paymentType = order.paymentType;
    this.isStarted = order.isStarted;
    this.doneCount = order.doneCount;
    this.isDone = order.isDone;
    this.createdAt = order.createdAt;
  }

  public toPOJO(): Order {
    return {
      id: this.id,
      type: this.type,
      trainingId: this.trainingId,
      userId: this.userId,
      price: this.price,
      amount: this.amount,
      totalPrice: this.totalPrice,
      paymentType: this.paymentType,
      isStarted: this.isStarted,
      doneCount: this.doneCount,
      isDone: this.isDone,
      createdAt: this.createdAt,
    };
  }
}
