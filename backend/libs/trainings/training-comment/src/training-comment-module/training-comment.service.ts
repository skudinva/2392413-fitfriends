import { Comment, PaginationResult } from '@backend/shared/core';
import { TrainingService } from '@backend/training';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TrainingCommentEntity } from './training-comment.entity';
import { TrainingCommentFactory } from './training-comment.factory';
import { TrainingCommentQuery } from './training-comment.query';
import { TrainingCommentRepository } from './training-comment.repository';

@Injectable()
export class TrainingCommentService {
  constructor(
    private readonly trainingCommentRepository: TrainingCommentRepository,
    private readonly trainingCommentFactory: TrainingCommentFactory,
    private readonly trainingPostService: TrainingService
  ) {}

  public async getComments(
    trainingId: Comment['trainingId'],
    query: TrainingCommentQuery
  ): Promise<PaginationResult<ReturnType<TrainingCommentEntity['toPOJO']>>> {
    const training = await this.trainingPostService.getTraining(trainingId);
    const commentsWithPagination =
      await this.trainingCommentRepository.findByTrainingId(training.id, query);

    const comments = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) =>
        comment.toPOJO()
      ),
    };

    return comments;
  }

  public async addComment(
    dto: CreateCommentDto
  ): Promise<TrainingCommentEntity> {
    const existsComment = this.trainingCommentRepository.findByUserAndPostId(
      dto.trainingId,
      dto.userId
    );

    if (existsComment) {
      throw new ConflictException('User already comment this post');
    }

    const newComment = this.trainingCommentFactory.create(dto);
    await this.trainingCommentRepository.save(newComment);
    //await this.trainingPostService.updateCommentCount(trainingId, 1);

    return newComment;
  }

  public async deleteComment(
    id: Comment['id'],
    userId: Comment['userId']
  ): Promise<void> {
    const existComment = await this.trainingCommentRepository.findById(id);
    if (userId !== existComment.userId) {
      throw new ConflictException('You are not allowed to delete this comment');
    }

    try {
      await this.trainingCommentRepository.deleteById(id);
      /*await this.trainingPostService.updateCommentCount(
        existComment.trainingId,
        -1
      );*/
    } catch {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
