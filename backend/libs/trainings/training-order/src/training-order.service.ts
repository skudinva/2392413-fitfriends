import {
  Order,
  PaginationResult,
  SortDirection,
  SortType,
  UserRole,
} from '@backend/shared/core';
import { TrainingService } from '@backend/training';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';
import { TrainingOrderEntity } from './training-order.entity';
import { TrainingOrderFactory } from './training-order.factory';
import { TrainingOrderQuery } from './training-order.query';
import { TrainingOrderRepository } from './training-order.repository';

@Injectable()
export class TrainingOrderService {
  constructor(
    private readonly trainingOrderRepository: TrainingOrderRepository,
    private readonly trainingService: TrainingService
  ) {}

  public async getOrders(
    query: TrainingOrderQuery
  ): Promise<PaginationResult<ReturnType<TrainingOrderEntity['toPOJO']>>> {
    const ordersWithPagination =
      await this.trainingOrderRepository.findByUserId(query);

    const orders = {
      ...ordersWithPagination,
      entities: ordersWithPagination.entities.map((order) => order.toPOJO()),
    };

    return orders;
  }

  public async findActiveOrderByTrainingId(
    trainingId: Order['trainingId'],
    userId: Order['userId']
  ): Promise<TrainingOrderEntity | null> {
    const orders = await this.getOrders({
      limit: 1,
      sortBy: SortType.Date,
      sortDirection: SortDirection.Asc,
      page: 1,
      activeOnly: true,
      trainingId,
      userId,
      role: UserRole.Sportsman,
    });

    if (!orders.entities.length) {
      return null;
    }

    return new TrainingOrderEntity(orders.entities[0]);
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

  public async updateOrder(
    id: Order['id'],
    userId: Order['userId'],
    orderEntity: TrainingOrderEntity
  ): Promise<TrainingOrderEntity> {
    const existOrder = await this.trainingOrderRepository.findById(id);
    if (userId !== existOrder.userId) {
      throw new ConflictException('You are not allowed to delete this order');
    }

    await this.trainingOrderRepository.update(orderEntity);
    return orderEntity;
  }

  public async updateTrainingState(
    trainingId: Order['trainingId'],
    dto: UpdateOrderStateDto
  ): Promise<TrainingOrderEntity> {
    const orderEntity = await this.findActiveOrderByTrainingId(
      trainingId,
      dto.userId
    );

    if (!orderEntity) {
      throw new ConflictException(
        `Active training with id ${trainingId} not found`
      );
    }

    if (dto.state === 'start') {
      orderEntity.isStarted = true;
    } else if (dto.state === 'finish') {
      orderEntity.isStarted = false;
      orderEntity.doneCount = orderEntity.doneCount + 1;
      orderEntity.isDone = orderEntity.doneCount === orderEntity.amount;
    }

    await this.updateOrder(orderEntity.id, dto.userId, orderEntity);
    return orderEntity;
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
