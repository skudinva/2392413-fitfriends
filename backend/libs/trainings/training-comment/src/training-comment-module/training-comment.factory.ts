import { Comment, EntityFactory } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TrainingCommentEntity } from './training-comment.entity';

@Injectable()
export class TrainingCommentFactory
  implements EntityFactory<TrainingCommentEntity>
{
  public create(entityPlainData: Comment): TrainingCommentEntity {
    return new TrainingCommentEntity(entityPlainData);
  }

  public createFromDto(
    dto: CreateCommentDto,
    trainingId: string
  ): TrainingCommentEntity {
    const currentDate = new Date();
    return new TrainingCommentEntity({
      ...dto,
      trainingId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
