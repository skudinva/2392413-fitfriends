import { BaseMongoRepository } from '@backend/data-access';
import { PaginationResult } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ShopUserEntity } from './shop-user.entity';
import { ShopUserFactory } from './shop-user.factory';
import { ShopUserModel } from './shop-user.model';
import { ShopUserQuery } from './shop-user.query';

@Injectable()
export class ShopUserRepository extends BaseMongoRepository<
  ShopUserEntity,
  ShopUserModel
> {
  constructor(
    entityFactory: ShopUserFactory,
    @InjectModel(ShopUserModel.name) shopUserModel: Model<ShopUserModel>
  ) {
    super(entityFactory, shopUserModel);
  }

  private calculatePage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  public async findByEmail(email: string): Promise<ShopUserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    if (!document) {
      return null;
    }
    return this.createEntityFromDocument(document);
  }

  public async find(
    query: ShopUserQuery
  ): Promise<PaginationResult<ShopUserEntity>> {
    const {
      locations,
      role,
      limit,
      page,
      sortBy,
      sortDirection,
      userId,
      readyForTraining,
    } = query;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const filter: FilterQuery<ShopUserModel> = {};

    filter._id = {
      $ne: userId,
    };

    if (locations) {
      filter.location = locations;
    }

    if (role) {
      filter.role = role;
    }

    if (readyForTraining) {
      filter.readyForTraining = readyForTraining;
    }

    const [records, userCount] = await Promise.all([
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
      totalPages: this.calculatePage(userCount, limit),
      itemsPerPage: limit,
      totalItems: userCount,
    };
  }
}
