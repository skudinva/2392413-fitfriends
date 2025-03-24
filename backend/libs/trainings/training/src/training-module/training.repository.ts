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

  private async getPostCount(
    where: Prisma.TrainingWhereInput
  ): Promise<number> {
    return this.client.training.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  public override async save(training: TrainingEntity): Promise<void> {
    const pojoPost = training.toPOJO();
    const record = await this.client.training.create({
      data: { ...pojoPost },
    });

    training.id = record.id;
  }

  override async update(training: TrainingEntity): Promise<void> {
    const pojoPost = training.toPOJO();
    await this.client.training.update({
      where: { id: training.id },
      data: { ...pojoPost },
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
    const orderBy: Prisma.TrainingOrderByWithRelationInput = {};

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.training.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getPostCount(where),
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
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}
