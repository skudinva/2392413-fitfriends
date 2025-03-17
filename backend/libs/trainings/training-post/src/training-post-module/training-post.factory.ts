import { EntityFactory, Training } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CreatePostDto } from './dto/create-post.dto';
import { TrainingPostEntity } from './training-post.entity';

@Injectable()
export class TrainingPostFactory implements EntityFactory<TrainingPostEntity> {
  create(entityPlainData: Training): TrainingPostEntity {
    return new TrainingPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(
    dto: CreatePostDto
  ): TrainingPostEntity {
    const newPost = new TrainingPostEntity();
    newPost.id = undefined;
    newPost.postType = dto.postType;
    newPost.userId = dto.userId;
    newPost.isRepost = false;
    newPost.createdAt = dayjs().toDate();
    newPost.publicDate = dayjs().toDate();
    newPost.likesCount = 0;
    newPost.commentsCount = 0;
    newPost.extraProperty = dto.extraProperty;
    newPost.originUserId = null;
    newPost.originPostId = null;
    newPost.tags = tags;

    return newPost;
  }

  public static createRepost(
    originalPost: Training,
    userId: string
  ): TrainingPostEntity {
    const newPost = new TrainingPostEntity(originalPost);

    newPost.id = undefined;
    newPost.isRepost = true;
    newPost.userId = userId;
    newPost.originPostId = originalPost.id;
    newPost.originUserId = originalPost.userId;
    newPost.createdAt = dayjs().toDate();
    newPost.publicDate = dayjs().toDate();
    newPost.likesCount = 0;
    newPost.commentsCount = 0;

    return newPost;
  }
}
