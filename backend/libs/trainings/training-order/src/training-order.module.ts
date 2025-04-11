import { PrismaClientModule } from '@backend/models';
import { TrainingModule } from '@backend/training';
import { Module } from '@nestjs/common';
import { TrainingOrderController } from './training-order.controller';
import { TrainingOrderFactory } from './training-order.factory';
import { TrainingOrderRepository } from './training-order.repository';
import { TrainingOrderService } from './training-order.service';

@Module({
  imports: [PrismaClientModule, TrainingModule],
  controllers: [TrainingOrderController],
  providers: [
    TrainingOrderService,
    TrainingOrderRepository,
    TrainingOrderFactory,
  ],
  exports: [TrainingOrderRepository, TrainingOrderFactory],
})
export class TrainingOrderModule {}
