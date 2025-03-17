import { PrismaClientModule } from '@backend/training-models';
import { Module } from '@nestjs/common';
import { TrainingTagFactory } from './training-tag.factory';
import { TrainingTagRepository } from './training-tag.repository';
import { TrainingTagService } from './training-tag.service';

@Module({
  imports: [PrismaClientModule],
  providers: [TrainingTagRepository, TrainingTagFactory, TrainingTagService],
  exports: [TrainingTagService],
})
export class TrainingTagModule {}
