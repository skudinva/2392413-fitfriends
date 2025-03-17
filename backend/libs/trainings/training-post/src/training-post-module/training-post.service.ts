import { PaginationResult } from '@backend/shared/core';
import { TrainingTagService } from '@backend/training-tag';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostState } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TrainingPostResponse } from './training-post.constant';
import { TrainingPostEntity } from './training-post.entity';
import { TrainingPostFactory } from './training-post.factory';
import { TrainingPostQuery } from './training-post.query';
import { TrainingPostRepository } from './training-post.repository';

@Injectable()
export class TrainingPostService {
  constructor(
    private readonly trainingPostRepository: TrainingPostRepository,
    private readonly trainingTagService: TrainingTagService
  ) {}

  public async createPost(dto: CreatePostDto): Promise<TrainingPostEntity> {
    const tags = dto.tags
      ? await this.trainingTagService.findOrCreate(dto.tags)
      : [];

    const newPost = TrainingPostFactory.createFromCreatePostDto(dto, tags);
    await this.trainingPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto
  ): Promise<TrainingPostEntity> {
    const existPost = await this.getPost(id, dto.userId);

    for (const [key] of Object.entries(existPost.extraProperty)) {
      existPost.extraProperty[key] =
        key === 'id' || key === 'postId'
          ? existPost[key]
          : dto.extraProperty[key] ?? null;
    }

    for (const [key, value] of Object.entries(dto)) {
      if (
        value !== undefined &&
        key !== 'extraProperty' &&
        key !== 'tags' &&
        existPost[key] !== value
      ) {
        existPost[key] = value;
      }
      if (key === 'tags' && value) {
        existPost.tags = await this.trainingTagService.findOrCreate(dto.tags);
      }
    }

    await this.trainingPostRepository.update(existPost);
    return existPost;
  }

  public async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.getPost(id, null);
    if (!post) {
      return;
    }

    if (userId !== post.userId) {
      throw new ConflictException('You are not allowed to delete post');
    }

    await this.trainingPostRepository.deleteById(id);
  }

  public async getPost(
    id: string,
    userId: string | null | undefined
  ): Promise<TrainingPostEntity> {
    const existPost = await this.trainingPostRepository.findById(id);
    if (!existPost) {
      throw new NotFoundException(TrainingPostResponse.PostNotFound);
    }

    if (
      userId !== null &&
      userId !== existPost.userId &&
      existPost.state === PostState.Draft
    ) {
      throw new NotFoundException(TrainingPostResponse.PostNotFound);
    }

    return existPost;
  }

  public async getPosts(
    query?: TrainingPostQuery
  ): Promise<PaginationResult<TrainingPostEntity | null>> {
    return this.trainingPostRepository.find(query);
  }

  public async createRepost(
    postId: string,
    userId: string
  ): Promise<TrainingPostEntity> {
    const existsPost = await this.getPost(postId, userId);

    const existRepost = await this.trainingPostRepository.findRepost(
      postId,
      userId
    );

    if (existRepost) {
      throw new ConflictException(
        `You already make repost of postId ${postId}`
      );
    }

    const newPost = TrainingPostFactory.createRepost(
      existsPost.toPOJO(),
      userId
    );
    await this.trainingPostRepository.save(newPost);

    return newPost;
  }

  public async updateCommentCount(
    postId: string,
    diffValue: number
  ): Promise<void> {
    const existPost = await this.getPost(postId, null);
    existPost.commentsCount += diffValue;
    await this.trainingPostRepository.update(existPost);
  }

  public async updateLikeCount(
    postId: string,
    diffValue: number
  ): Promise<void> {
    const existPost = await this.getPost(postId, null);
    existPost.likesCount += diffValue;
    await this.trainingPostRepository.update(existPost);
  }
}
