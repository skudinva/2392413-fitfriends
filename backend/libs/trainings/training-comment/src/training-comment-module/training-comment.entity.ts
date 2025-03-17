import { Comment, Entity, StorableEntity } from '@backend/shared/core';

export class TrainingCommentEntity
  extends Entity
  implements StorableEntity<Comment>
{
  public createdAt!: Date;
  public updatedAt!: Date;
  public trainingId!: string;
  public message!: string;
  public userId!: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.message = comment.message;
    this.trainingId = comment.trainingId ?? undefined;
    this.userId = comment.userId;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      message: this.message,
      trainingId: this.trainingId,
      userId: this.userId,
    };
  }
}
