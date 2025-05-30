import { Friend, MongoEntity, StorableEntity } from '@backend/shared/core';

export class FriendEntity
  extends MongoEntity
  implements StorableEntity<Friend>
{
  public userId!: string;
  public friendId!: string;

  constructor(friend?: Friend) {
    super();
    this.populate(friend);
  }
  public populate(friend?: Friend): void {
    if (!friend) {
      return;
    }
    const { id, userId, friendId } = friend;

    this.id = id ?? '';
    this.userId = userId;
    this.friendId = friendId;
  }

  toPOJO(): Friend {
    return {
      id: this.id,
      userId: this.userId,
      friendId: this.friendId,
    };
  }
}
