import { OmitType } from '@nestjs/swagger';
import { BaseTrainingDto } from './base-training.dto';

export class CreateTrainingDto extends OmitType(BaseTrainingDto, ['id']) {}
