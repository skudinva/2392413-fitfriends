import { TrainingLikeModule } from '@backend/training-like';
import { TrainingNotifyModule } from '@backend/training-notify';
import { TrainingTagModule } from '@backend/training-tag';
import { Module } from '@nestjs/common';
import { TrainingPostController } from './training-post.controller';
import { TrainingPostFactory } from './training-post.factory';
import { TrainingPostRepository } from './training-post.repository';
import { TrainingPostService } from './training-post.service';

@Module({
  imports: [TrainingTagModule, TrainingLikeModule, TrainingNotifyModule],
  controllers: [TrainingPostController],
  providers: [TrainingPostService, TrainingPostRepository, TrainingPostFactory],
  exports: [TrainingPostService],
})
export class TrainingPostModule {}
