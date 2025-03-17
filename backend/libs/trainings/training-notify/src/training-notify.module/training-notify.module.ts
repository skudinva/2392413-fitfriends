import { getRabbitMQOptions } from '@backend/helpers';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { TrainingNotifyService } from './training-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit')),
  ],
  providers: [TrainingNotifyService],
  exports: [TrainingNotifyService],
})
export class TrainingNotifyModule {}
