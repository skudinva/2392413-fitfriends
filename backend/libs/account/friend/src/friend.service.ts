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

  public async getFriends(query?: FriendQuery) {
    return this.friendRepository.find(query);
  }

  public async create(userId: string, friendId: string) {
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

  public async delete(userId: string, friendId: string) {
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
}
