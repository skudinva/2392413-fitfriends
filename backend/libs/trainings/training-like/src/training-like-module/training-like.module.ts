import { Module } from '@nestjs/common';
import { TrainingLikeFactory } from './training-like.factory';
import { TrainingLikeRepository } from './training-like.repository';
import { TrainingLikeService } from './training-like.service';

@Module({
  providers: [TrainingLikeService, TrainingLikeFactory, TrainingLikeRepository],
  exports: [TrainingLikeService],
})
export class TrainingLikeModule {}
