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

  private calculateTrainingsPage(totalCount: number, limit: number): number {
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
  ): Promise<PaginationResult<ShopUserEntity | null>> {
    const {
      types,
      locations,
      trainingLevel,
      role,
      limit,
      page,
      sortBy,
      sortDirection,
    } = query;
    const skip = page && limit ? (page - 1) * limit : undefined;
    const filter: FilterQuery<ShopUserModel> = {};
    if (types) {
      filter.where({ type: types });
    }

    if (locations) {
      filter.where({ location: locations });
    }

    if (trainingLevel) {
      filter.where({ trainingLevel });
    }

    if (role) {
      filter.where({ role });
    }

    const [records, trainingCount] = await Promise.all([
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
      totalPages: this.calculateTrainingsPage(trainingCount, limit),
      itemsPerPage: limit,
      totalItems: trainingCount,
    };
  }
}
