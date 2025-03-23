import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingFactory } from './training.factory';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';

@Module({
  /*
  скорее всего нужен в слудующих итерациях
  imports: [TrainingNotifyModule],
  */
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, TrainingFactory],
  exports: [TrainingService],
})
export class TrainingModule {}
