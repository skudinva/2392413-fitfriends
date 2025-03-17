import { PgEntity, StorableEntity, Training } from '@backend/shared/core';

export class TrainingPostEntity
  extends PgEntity
  implements StorableEntity<Training>
{
  public userId!: string;
  public isRepost!: boolean;
  public originUserId?: string;
  public originPostId?: string;
  public createdAt!: Date;
  public publicDate!: Date;
  public likesCount!: number;
  public commentsCount!: number;

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
    this.createdAt = createdAt;
    this.publicDate = publicDate;
    this.likesCount = likesCount;
    this.commentsCount = commentsCount;
    this.extraProperty = extraProperty ?? undefined;
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
