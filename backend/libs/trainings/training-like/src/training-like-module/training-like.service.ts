import { Like } from '@backend/shared/core';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrainingLikeEntity } from './training-like.entity';
import { TrainingLikeRepository } from './training-like.repository';

@Injectable()
export class TrainingLikeService {
  constructor(
    private readonly trainingLikeRepository: TrainingLikeRepository
  ) {}

  public async like(like: Like): Promise<void> {
    const isLikeExists = await this.trainingLikeRepository.isLikeExists(like);
    if (isLikeExists) {
      throw new ConflictException(
        `Like already exist with trainingId ${like.trainingId} `
      );
    }

    const newLike = new TrainingLikeEntity(like);
    await this.trainingLikeRepository.save(newLike);
  }

  public async unlike(like: Like): Promise<void> {
    const isLikeExists = await this.trainingLikeRepository.isLikeExists(like);
    if (!isLikeExists) {
      throw new NotFoundException(
        `Like with trainingId ${like.trainingId} not found for user.`
      );
    }

    await this.trainingLikeRepository.deleteByIds(like);
  }
}
