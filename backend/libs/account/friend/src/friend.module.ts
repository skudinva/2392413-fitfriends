import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendController } from './friend.controller';
import { FriendFactory } from './friend.factory';
import { FriendModel, FriendsSchema } from './friend.model';
import { FriendRepository } from './friend.repository';
import { FriendService } from './friend.service';

@Module({
  controllers: [FriendController],
  providers: [FriendRepository, FriendFactory, FriendService],
  exports: [FriendRepository, FriendService],
  imports: [
    MongooseModule.forFeature([
      { name: FriendModel.name, schema: FriendsSchema },
    ]),
  ],
})
export class FriendModule {}
