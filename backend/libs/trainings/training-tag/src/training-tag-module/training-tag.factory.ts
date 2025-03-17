import { EntityFactory, Tag } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { TrainingTagEntity } from './training-tag.entity';

@Injectable()
export class TrainingTagFactory implements EntityFactory<TrainingTagEntity> {
  create(entityPlainData: Tag): TrainingTagEntity {
    return new TrainingTagEntity(entityPlainData);
  }
}
