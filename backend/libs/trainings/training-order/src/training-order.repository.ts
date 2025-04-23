import { BasePostgresRepository } from '@backend/data-access';
import {
  Order,
  OrderType,
  PaginationResult,
  PayType,
  UserRole,
} from '@backend/shared/core';
import { PrismaClientService } from '@backend/training-models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TrainingOrderEntity } from './training-order.entity';
import { TrainingOrderFactory } from './training-order.factory';
import { TrainingOrderQuery } from './training-order.query';

@Injectable()
export class TrainingOrderRepository extends BasePostgresRepository<
  TrainingOrderEntity,
  Order
> {
  constructor(
    entityFactory: TrainingOrderFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getOrdersCount(where: Prisma.OrderWhereInput): Promise<number> {
    return this.client.order.count({ where });
  }

  private calculateOrderPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: TrainingOrderEntity): Promise<void> {
    const record = await this.client.order.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public override async update(entity: TrainingOrderEntity): Promise<void> {
    await this.client.order.update({
      data: { ...entity.toPOJO() },
      where: { id: entity.id },
    });
  }

  public override async findById(
    id: Order['id']
  ): Promise<TrainingOrderEntity | null> {
    const document = await this.client.order.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    }

    return this.createEntityFromDocument({
      ...document,
      type: document.type as OrderType,
      paymentType: document.paymentType as PayType,
    });
  }

  public override async deleteById(id: Order['id']): Promise<void> {
    await this.client.order.delete({
      where: {
        id,
      },
    });
  }

  public async findByUserId(
    query: TrainingOrderQuery
  ): Promise<PaginationResult<TrainingOrderEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.OrderWhereInput = {};

    if (query.role === UserRole.Sportsman) {
      where.userId = query.userId;
    } else if (query.role === UserRole.Coach) {
      where.training = { userId: query.userId };
    }

    const orderBy: Prisma.OrderOrderByWithRelationInput = {};

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    if (query.activeOnly) {
      where.isDone = false;
    }

    if (query.trainingId) {
      where.trainingId = query.trainingId;
    }

    const [documents, ordersCount] = await Promise.all([
      this.client.order.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.getOrdersCount(where),
    ]);

    return {
      entities: documents.map((document) =>
        this.createEntityFromDocument({
          ...document,
          type: document.type as OrderType,
          paymentType: document.paymentType as PayType,
        })
      ),
      currentPage: query?.page,
      totalPages: this.calculateOrderPage(ordersCount, take),
      itemsPerPage: take,
      totalItems: ordersCount,
    };
  }
}
