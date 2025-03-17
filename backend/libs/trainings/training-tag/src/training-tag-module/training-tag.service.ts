import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TrainingTagEntity } from './training-tag.entity';
import { TrainingTagRepository } from './training-tag.repository';

@Injectable()
export class TrainingTagService {
  constructor(private readonly trainingTagRepository: TrainingTagRepository) {}
  public async getTagById(id: string): Promise<TrainingTagEntity | null> {
    return this.trainingTagRepository.findById(id);
  }

  public async getTagByTitle(title: string): Promise<TrainingTagEntity | null> {
    return this.trainingTagRepository.findByTitle(title);
  }

  public async findOrCreate(titles: string[]): Promise<TrainingTagEntity[]> {
    return await this.trainingTagRepository.findOrCreateByTitles(titles);
  }

  public async create(dto: CreateTagDto): Promise<TrainingTagEntity> {
    const { title } = dto;
    return await this.trainingTagRepository.findOrCreateByTitle(title);
  }
}
