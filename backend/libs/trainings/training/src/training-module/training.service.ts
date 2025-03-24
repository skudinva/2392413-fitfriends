import { PaginationResult, Training } from '@backend/shared/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingResponse } from './training.constant';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';
import { TrainingQuery } from './training.query';
import { TrainingRepository } from './training.repository';

@Injectable()
export class TrainingService {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  public async createTraining(dto: CreateTrainingDto): Promise<TrainingEntity> {
    const newTraining = TrainingFactory.composeFromCreateTrainingDto(dto);
    await this.trainingRepository.save(newTraining);

    return newTraining;
  }

  public async updateTraining(
    id: Training['id'],
    dto: UpdateTrainingDto
  ): Promise<TrainingEntity> {
    const existTraining = await this.getTraining(id);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existTraining[key] !== value) {
        existTraining[key] = value;
      }
    }

    await this.trainingRepository.update(existTraining);
    return existTraining;
  }

  public async deleteTraining(id: Training['id']): Promise<void> {
    const training = await this.getTraining(id);
    if (!training) {
      return;
    }

    await this.trainingRepository.deleteById(id);
  }

  public async getTraining(id: Training['id']): Promise<TrainingEntity> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new NotFoundException(TrainingResponse.TrainingNotFound);
    }

    return existTraining;
  }

  public async getTrainings(
    query?: TrainingQuery
  ): Promise<PaginationResult<TrainingEntity | null>> {
    return this.trainingRepository.find(query);
  }

  public async updateAverageRating(
    trainingId: Training['id'],
    averageRating: Training['averageRating']
  ): Promise<void> {
    const existTraining = await this.getTraining(trainingId);
    if (!existTraining) {
      return;
    }
    existTraining.averageRating = averageRating;
    await this.trainingRepository.update(existTraining);
  }
}
