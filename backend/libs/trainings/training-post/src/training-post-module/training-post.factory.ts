import { EntityFactory, Post } from '@backend/shared/core';
import { TrainingTagEntity } from '@backend/training-tag';
import { Injectable } from '@nestjs/common';
import { PostState } from '@prisma/client';
import dayjs from 'dayjs';
import { CreatePostDto } from './dto/create-post.dto';
import { TrainingPostEntity } from './training-post.entity';

@Injectable()
export class TrainingPostFactory implements EntityFactory<TrainingPostEntity> {
  create(entityPlainData: Post): TrainingPostEntity {
    return new TrainingPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(
    dto: CreatePostDto,
    tags: TrainingTagEntity[]
  ): TrainingPostEntity {
    const newPost = new TrainingPostEntity();
    newPost.id = undefined;
    newPost.postType = dto.postType;
    newPost.userId = dto.userId;
    newPost.isRepost = false;
    newPost.state = PostState.Published;
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
    originalPost: Post,
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
