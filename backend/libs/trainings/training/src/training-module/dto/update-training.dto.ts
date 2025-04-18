import { PartialType } from '@nestjs/swagger';
import { BaseTrainingDto } from './base-training.dto';

export class UpdateTrainingDto extends PartialType(BaseTrainingDto) {}
