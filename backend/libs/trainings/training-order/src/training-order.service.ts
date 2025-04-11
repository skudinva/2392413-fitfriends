import { Order, PaginationResult } from '@backend/shared/core';
import { ShopUserService } from '@backend/shop-user';
import { TrainingService } from '@backend/training';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { TrainingOrderEntity } from './training-order.entity';
import { TrainingOrderFactory } from './training-order.factory';
import { TrainingOrderQuery } from './training-order.query';
import { TrainingOrderRepository } from './training-order.repository';

@Injectable()
export class TrainingOrderService {
  constructor(
    private readonly trainingOrderRepository: TrainingOrderRepository,
    private readonly trainingService: TrainingService,
    private readonly userService: ShopUserService
  ) {}

  public async getOrders(
    userId: Order['userId'],
    query: TrainingOrderQuery
  ): Promise<PaginationResult<ReturnType<TrainingOrderEntity['toPOJO']>>> {
    const user = await this.userService.getUserInfo(userId);
    if (!user) {
      return;
    }
    const ordersWithPagination =
      await this.trainingOrderRepository.findByUserId(userId, query);

    const orders = {
      ...ordersWithPagination,
      entities: ordersWithPagination.entities.map((order) => order.toPOJO()),
    };

    return orders;
  }

  public async addOrder(
    trainingId: Order['trainingId'],
    dto: CreateOrderDto
  ): Promise<TrainingOrderEntity> {
    const existsTraining = await this.trainingService.getTraining(trainingId);
    if (!existsTraining) {
      return;
    }

    const newOrder = TrainingOrderFactory.composeFromCreateOrderDto(dto);
    await this.trainingOrderRepository.save(newOrder);
    return newOrder;
  }

  public async deleteOrder(
    id: Order['id'],
    userId: Order['userId']
  ): Promise<void> {
    const existOrder = await this.trainingOrderRepository.findById(id);
    if (userId !== existOrder.userId) {
      throw new ConflictException('You are not allowed to delete this order');
    }

    try {
      await this.trainingOrderRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
