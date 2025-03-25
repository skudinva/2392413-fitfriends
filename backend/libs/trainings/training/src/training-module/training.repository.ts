import { BasePostgresRepository } from '@backend/data-access';
import {
  PaginationResult,
  Training,
  TrainingDuration,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '@backend/shared/core';
import { PrismaClientService } from '@backend/training-models';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';
import { TrainingQuery } from './training.query';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<
  TrainingEntity,
  Training
> {
  constructor(entityFactory: TrainingFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  private async getTrainingCount(
    where: Prisma.TrainingWhereInput
  ): Promise<number> {
    return this.client.training.count({ where });
  }

  private calculateTrainingsPage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  public override async save(training: TrainingEntity): Promise<void> {
    const pojoTraining = training.toPOJO();
    const record = await this.client.training.create({
      data: { ...pojoTraining },
    });

    training.id = record.id;
  }

  override async update(training: TrainingEntity): Promise<void> {
    const pojoTraining = training.toPOJO();
    await this.client.training.update({
      where: { id: training.id },
      data: { ...pojoTraining },
    });
  }

  public override async deleteById(id: number): Promise<void> {
    await this.client.training.delete({ where: { id } });
  }

  public override async findById(
    id: TrainingEntity['id']
  ): Promise<TrainingEntity | null> {
    const training = await this.client.training.findUnique({
      where: { id },
    });

    if (!training) {
      return null;
    }

    return this.createEntityFromDocument({
      ...training,
      level: training.level as TrainingLevel,
      type: training.type as TrainingType,
      duration: training.duration as TrainingDuration,
      gender: training.gender as UserGender,
    });
  }

  public async find(
    query?: TrainingQuery
  ): Promise<PaginationResult<TrainingEntity | null>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.TrainingWhereInput = {};
    const andConditions: Prisma.TrainingWhereInput[] = [];
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};

    if (query.minPrice === query.maxPrice) {
      andConditions.push({ price: { equals: query.maxPrice } });
    } else {
      if (query?.minPrice !== undefined && query?.minPrice !== null) {
        andConditions.push({ price: { gte: query.minPrice } });
      }

      if (query?.maxPrice !== undefined && query?.maxPrice !== null) {
        andConditions.push({ price: { lte: query.maxPrice } });
      }
    }

    if (query.minCalories === query.maxCalories) {
      andConditions.push({ calories: { equals: query.maxCalories } });
    } else {
      if (query?.minCalories !== undefined && query?.minCalories !== null) {
        andConditions.push({ calories: { gte: query.minCalories } });
      }

      if (query?.maxCalories !== undefined && query?.maxCalories !== null) {
        andConditions.push({ calories: { lte: query.maxCalories } });
      }
    }

    if (query.minRating === query.maxRating) {
      andConditions.push({ rating: { equals: query.maxRating } });
    } else {
      if (query?.minRating !== undefined && query?.minRating !== null) {
        andConditions.push({ rating: { gte: query.minRating } });
      }

      if (query?.maxRating !== undefined && query?.maxRating !== null) {
        andConditions.push({ rating: { lte: query.maxRating } });
      }
    }

    if (andConditions.length) {
      where.AND = [...andConditions];
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, trainingCount] = await Promise.all([
      this.client.training.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getTrainingCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument({
          ...record,
          level: record.level as TrainingLevel,
          type: record.type as TrainingType,
          duration: record.duration as TrainingDuration,
          gender: record.gender as UserGender,
        })
      ),
      currentPage: query?.page,
      totalPages: this.calculateTrainingsPage(trainingCount, take),
      itemsPerPage: take,
      totalItems: trainingCount,
    };
  }
}
