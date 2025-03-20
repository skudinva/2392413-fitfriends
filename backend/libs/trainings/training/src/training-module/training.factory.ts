import { EntityFactory, Training } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  create(entityPlainData: Training): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }

  public static composeFromCreateTrainingDto(
    dto: CreateTrainingDto
  ): TrainingEntity {
    const newTraining = new TrainingEntity();

    newTraining.id = undefined;
    newTraining.title = dto.title;
    newTraining.image = dto.image;
    newTraining.level = dto.level;
    newTraining.type = dto.type;
    newTraining.duration = dto.duration;
    newTraining.price = dto.price;
    newTraining.calories = dto.calories;
    newTraining.description = dto.description;
    newTraining.gender = dto.gender;
    newTraining.video = dto.video;
    newTraining.userId = dto.userId;
    newTraining.isSpecial = dto.isSpecial;
    newTraining.createdAt = dayjs().toDate();
    newTraining.rating = 0;

    return newTraining;
  }
}
