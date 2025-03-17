import { EntityFactory, Like } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { TrainingLikeEntity } from './training-like.entity';

@Injectable()
export class TrainingLikeFactory implements EntityFactory<TrainingLikeEntity> {
  create(entityPlainData: Like): TrainingLikeEntity {
    return new TrainingLikeEntity(entityPlainData);
  }
}
