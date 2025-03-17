import {
  Entity,
  PostExtraProperty,
  StorableEntity,
  Training,
} from '@backend/shared/core';
import { TrainingTagEntity, TrainingTagFactory } from '@backend/training-tag';
import { PostState, PostType } from '@prisma/client';

export class TrainingPostEntity
  extends Entity
  implements StorableEntity<Training>
{
  public postType!: PostType;
  public userId!: string;
  public isRepost!: boolean;
  public originUserId?: string;
  public originPostId?: string;
  public tags!: TrainingTagEntity[];
  public state!: PostState;
  public createdAt!: Date;
  public publicDate!: Date;
  public likesCount!: number;
  public commentsCount!: number;
  public extraProperty?: PostExtraProperty;

  constructor(training?: Training) {
    super();
    this.populate(training);
  }
  public populate(training?: Training): void {
    if (!training) {
      return;
    }
    const {
      id,
      postType,
      userId,
      isRepost,
      originUserId,
      originPostId,
      tags,
      state,
      createdAt,
      publicDate,
      likesCount,
      commentsCount,
      extraProperty,
    } = training;

    this.id = id ?? undefined;
    this.postType = postType;
    this.userId = userId;
    this.isRepost = isRepost;
    this.originUserId = originUserId ?? undefined;
    this.originPostId = originPostId ?? undefined;
    this.tags = [];
    this.state = state;
    this.createdAt = createdAt;
    this.publicDate = publicDate;
    this.likesCount = likesCount;
    this.commentsCount = commentsCount;
    this.extraProperty = extraProperty ?? undefined;

    const trainingTagFactory = new TrainingTagFactory();
    for (const tag of tags) {
      const trainingTagEntity = trainingTagFactory.create(tag);
      this.tags.push(trainingTagEntity);
    }
  }

  toPOJO(): Training {
    return {
      id: this.id,
      postType: this.postType,
      userId: this.userId,
      isRepost: this.isRepost,
      originUserId: this.originUserId ?? undefined,
      originPostId: this.originPostId ?? undefined,
      state: this.state,
      createdAt: this.createdAt,
      publicDate: this.publicDate,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      extraProperty: this.extraProperty
        ? {
            url: this.extraProperty.url,
            describe: this.extraProperty.describe,
            photo: this.extraProperty.photo,
            text: this.extraProperty.text,
            announce: this.extraProperty.announce,
            name: this.extraProperty.name,
            quoteText: this.extraProperty.quoteText,
            quoteAuthor: this.extraProperty.quoteAuthor,
          }
        : null,
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
    };
  }
}
