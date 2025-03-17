import { Entity, Like, StorableEntity } from '@backend/shared/core';

export class TrainingLikeEntity extends Entity implements StorableEntity<Like> {
  public userId!: string;
  public trainingId!: string;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }
  public populate(like?: Like): void {
    if (!like) {
      return;
    }
    const { userId, trainingId } = like;

    this.userId = userId;
    this.trainingId = trainingId;
  }

  toPOJO(): Like {
    return {
      userId: this.userId,
      trainingId: this.trainingId,
    };
  }
}
