import { EntityFactory, Friend } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { FriendEntity } from './friend.entity';

@Injectable()
export class FriendFactory implements EntityFactory<FriendEntity> {
  create(entityPlainData: Friend): FriendEntity {
    return new FriendEntity(entityPlainData);
  }
}
