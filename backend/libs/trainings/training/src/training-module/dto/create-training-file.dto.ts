import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import 'multer';
import { CreateTrainingDto } from './create-training.dto';

export class CreateTrainingFileDto {
  @ApiProperty({
    description: 'photo file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  public file?: Express.Multer.File;

  @ValidateNested()
  @Type(() => CreateTrainingDto)
  @ApiProperty()
  training: CreateTrainingDto;
}
