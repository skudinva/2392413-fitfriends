import { BasePostgresRepository } from '@backend/data-access';
import { Like } from '@backend/shared/core';
import { PrismaClientService } from '@backend/training-models';
import { Injectable } from '@nestjs/common';
import { TrainingLikeEntity } from './training-like.entity';
import { TrainingLikeFactory } from './training-like.factory';

@Injectable()
export class TrainingLikeRepository extends BasePostgresRepository<
  TrainingLikeEntity,
  Like
> {
  constructor(likeFactory: TrainingLikeFactory, client: PrismaClientService) {
    super(likeFactory, client);
  }
  public async isLikeExists({ userId, trainingId }: Like): Promise<boolean> {
    const like = await this.client.like.findFirst({
      where: {
        userId,
        trainingId,
      },
    });

    return like !== null;
  }

  public override async save(entity: TrainingLikeEntity): Promise<void> {
    await this.client.like.create({
      data: {
        ...entity.toPOJO(),
      },
    });
  }

  public async deleteByIds({ userId, trainingId }: Like): Promise<void> {
    await this.client.like.delete({
      where: {
        userId_postId: {
          trainingId,
          userId,
        },
      },
    });
  }
}
