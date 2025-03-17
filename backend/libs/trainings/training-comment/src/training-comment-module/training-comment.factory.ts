import { Comment, EntityFactory } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { TrainingCommentEntity } from './training-comment.entity';

@Injectable()
export class TrainingCommentFactory
  implements EntityFactory<TrainingCommentEntity>
{
  public create(entityPlainData: Comment): TrainingCommentEntity {
    return new TrainingCommentEntity(entityPlainData);
  }
}
