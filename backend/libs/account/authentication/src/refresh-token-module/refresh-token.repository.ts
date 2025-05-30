import { BaseMongoRepository } from '@backend/data-access';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';
import { RefreshTokenModel } from './refresh-token.model';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    entityFactory: RefreshTokenFactory,
    @InjectModel(RefreshTokenModel.name) shopUserModel: Model<RefreshTokenModel>
  ) {
    super(entityFactory, shopUserModel);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(
    tokenId: string
  ): Promise<RefreshTokenEntity | null> {
    const refreshTokenDocument = await this.model.findOne({ tokenId }).exec();
    return this.createEntityFromDocument(refreshTokenDocument);
  }

  public async deleteExpiredTokens(): Promise<void> {
    this.model.deleteMany({ expiresIn: { $lt: new Date() } });
  }
}
