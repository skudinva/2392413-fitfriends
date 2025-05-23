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
    private readonly trainingService: TrainingService
  ) {}

  public async getComments(
    trainingId: Comment['trainingId'],
    query: TrainingCommentQuery
  ): Promise<PaginationResult<ReturnType<TrainingCommentEntity['toPOJO']>>> {
    const training = await this.trainingService.getTraining(trainingId);
    if (!training) {
      return;
    }
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
    trainingId: Comment['trainingId'],
    dto: CreateCommentDto
  ): Promise<TrainingCommentEntity> {
    const existsTraining = await this.trainingService.getTraining(trainingId);
    if (!existsTraining) {
      return;
    }

    const newComment = TrainingCommentFactory.composeFromCreateCommentDto(dto);
    await this.trainingCommentRepository.save(newComment);
    const averageRation =
      await this.trainingCommentRepository.calculateAverageRating(trainingId);
    await this.trainingService.updateAverageRating(trainingId, averageRation);

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
      const averageRation =
        await this.trainingCommentRepository.calculateAverageRating(
          existComment.trainingId
        );
      await this.trainingService.updateAverageRating(
        existComment.trainingId,
        averageRation
      );
    } catch {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
