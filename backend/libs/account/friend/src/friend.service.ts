import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FriendEntity } from './friend.entity';
import { FriendQuery } from './friend.query';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  private async createFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new ConflictException('userId can not be equal friendId');
    }
    const existsFriend = await this.friendRepository.findFriendRecord(
      userId,
      friendId
    );
    if (existsFriend) {
      throw new ConflictException(
        `Users with ids ${userId} and ${friendId} already friends`
      );
    }
    const friendEntity = new FriendEntity({ userId, friendId });
    await this.friendRepository.save(friendEntity);
    return friendEntity;
  }

  private async deleteFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new ConflictException('userId can not be equal friendId');
    }
    const existsFriend = await this.friendRepository.findFriendRecord(
      userId,
      friendId
    );
    if (!existsFriend) {
      throw new NotFoundException(
        `Users with ids ${userId} and ${friendId} not friends`
      );
    }

    await this.friendRepository.deleteById(existsFriend.id);
  }

  public async getFriends(query?: FriendQuery) {
    const friendsWithPagination = await this.friendRepository.find(query);

    const result = {
      ...friendsWithPagination,
      entities: friendsWithPagination.entities.map((friend) => {
        return { userId: friend.toPOJO().friendId };
      }),
    };
    return result;
  }

  public async create(userId: string, friendId: string) {
    const friendRequests = await Promise.all([
      this.createFriend(userId, friendId),
      this.createFriend(friendId, userId),
    ]);

    return friendRequests[0];
  }

  public async delete(userId: string, friendId: string) {
    await Promise.all([
      this.deleteFriend(userId, friendId),
      this.deleteFriend(friendId, userId),
    ]);
  }
}
