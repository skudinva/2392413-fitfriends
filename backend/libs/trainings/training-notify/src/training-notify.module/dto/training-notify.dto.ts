import { Training } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class TrainingNotifyDto {
  @ApiProperty({
    description: 'userId',
    example: '677cd8d75ff92067f1de5911',
  })
  @IsMongoId()
  public userId: string;

  public trainings: Training[];
}
