import { BaseMongoRepository } from '@backend/data-access';
import { PaginationResult } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FriendEntity } from './friend.entity';
import { FriendFactory } from './friend.factory';
import { FriendModel } from './friend.model';
import { FriendQuery } from './friend.query';

@Injectable()
export class FriendRepository extends BaseMongoRepository<
  FriendEntity,
  FriendModel
> {
  constructor(
    entityFactory: FriendFactory,
    @InjectModel(FriendModel.name) friendModel: Model<FriendModel>
  ) {
    super(entityFactory, friendModel);
  }

  private calculatePage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  public async find(
    query: FriendQuery
  ): Promise<PaginationResult<FriendEntity>> {
    const { userId, limit, page, sortBy, sortDirection } = query;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const filter: FilterQuery<FriendModel> = {};
    filter.userId = userId;

    const [records, friendCount] = await Promise.all([
      this.model
        .find(filter)
        .limit(limit)
        .skip(skip)
        .sort({ [sortBy]: sortDirection })
        .exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePage(friendCount, limit),
      itemsPerPage: limit,
      totalItems: friendCount,
    };
  }

  public async findFriendRecord(
    userId: string,
    friendId: string
  ): Promise<FriendEntity | null> {
    const record = await this.model
      .findOne({ userId: userId, friendId: friendId })
      .exec();
    if (!record) {
      return null;
    }
    return this.createEntityFromDocument(record);
  }
}
