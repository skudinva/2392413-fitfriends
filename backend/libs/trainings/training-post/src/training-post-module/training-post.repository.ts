import { BasePostgresRepository } from '@backend/data-access';
import { PaginationResult, Training } from '@backend/shared/core';
import { PrismaClientService } from '@backend/training-models';
import { Injectable } from '@nestjs/common';
import { PostState, Prisma } from '@prisma/client';
import { TrainingPostEntity } from './training-post.entity';
import { TrainingPostFactory } from './training-post.factory';
import { TrainingPostQuery } from './training-post.query';

@Injectable()
export class TrainingPostRepository extends BasePostgresRepository<
  TrainingPostEntity,
  Training
> {
  constructor(entityFactory: TrainingPostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.training.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  public override async save(training: TrainingPostEntity): Promise<void> {
    const pojoPost = training.toPOJO();
    const record = await this.client.training.create({
      data: {
        ...pojoPost,
        tags: {
          connect: pojoPost.tags.map(({ id }) => ({ id })),
        },
        comments: {
          connect: [],
        },
        extraProperty: { create: { ...pojoPost.extraProperty } },
      },
    });

    training.id = record.id;
  }

  override async update(training: TrainingPostEntity): Promise<void> {
    const pojoPost = training.toPOJO();
    await this.client.training.update({
      where: { id: training.id },
      data: {
        postType: pojoPost.postType,
        isRepost: pojoPost.isRepost,
        originUserId: pojoPost.originUserId ?? undefined,
        originPostId: pojoPost.originPostId ?? undefined,
        state: pojoPost.state,
        publicDate: pojoPost.publicDate,
        likesCount: pojoPost.likesCount,
        commentsCount: pojoPost.commentsCount,
        tags: {
          set: pojoPost.tags.map(({ id }) => ({ id })),
        },
        extraProperty: {
          update: {
            data: { ...pojoPost.extraProperty },
            where: {
              trainingId: training.id,
            },
          },
        },
      },
      include: {
        extraProperty: true,
        tags: true,
      },
    });
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.training.delete({
      where: {
        id,
      },
    });
  }

  public override async findById(
    id: TrainingPostEntity['id']
  ): Promise<TrainingPostEntity | null> {
    const training = await this.client.training.findUnique({
      where: { id },
    });

    return this.createEntityFromDocument(training);
  }

  public async find(
    query?: TrainingPostQuery
  ): Promise<PaginationResult<TrainingPostEntity | null>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    const userId = query.userId ?? null;
    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags,
          },
        },
      };
    }

    if (query?.postType) {
      where.postType = query.postType;
    }

    if (query?.postUserId) {
      where.userId = query.postUserId;
      if (userId !== query.postUserId) {
        where.state = PostState.Published;
      }
    } else {
      where.state = PostState.Published;
    }

    if (query?.search) {
      where.extraProperty = {
        name: {
          contains: query.search,
          mode: 'insensitive',
        },
      };
    }

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
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}
