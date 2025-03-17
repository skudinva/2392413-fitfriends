import { rabbitConfig } from '@backend/config';
import { Training, RabbitRouting } from '@backend/shared/core';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TrainingNotifyDto } from './dto/training-notify.dto';

@Injectable()
export class TrainingNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPostNotify(trainings: Training[], userId: string) {
    return this.rabbitClient.publish<TrainingNotifyDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPostNotify,
      { userId, trainings }
    );
  }
}
