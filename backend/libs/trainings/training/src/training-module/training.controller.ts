import { fillDto } from '@backend/helpers';
import { SortDirection, SortType } from '@backend/shared/core';
import { TrainingNotifyService } from '@backend/training-notify';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { UserIdDto } from './dto/user-id.dto';
import { TrainingWithPaginationRdo } from './rdo/training-with-pagination.rdo';
import { TrainingRdo } from './rdo/training.rdo';
import { TrainingResponse } from './training.constant';
import { TrainingQuery } from './training.query';
import { TrainingService } from './training.service';

@Controller('trainings')
export class TrainingController {
  constructor(
    private readonly trainingPostService: TrainingService,
    private readonly notifyService: TrainingNotifyService
  ) {}

  @Get('/:id/:userId')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.TrainingFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.TrainingNotFound,
  })
  @ApiTags('training post')
  public async show(@Param('id') id: number) {
    const training = await this.trainingPostService.getTraining(id);
    return fillDto(TrainingRdo, training.toPOJO());
  }

  @Get('/')
  @ApiResponse({
    type: TrainingWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.TrainingFound,
  })
  @ApiTags('training post')
  public async index(@Query() query: TrainingQuery) {
    const postsWithPagination = await this.trainingPostService.getTrainings(
      query
    );
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((training) =>
        training.toPOJO()
      ),
    };
    return fillDto(TrainingWithPaginationRdo, result);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: TrainingResponse.TrainingCreated,
  })
  @Post('/')
  @ApiTags('training post')
  public async create(@Body() dto: CreateTrainingDto) {
    const newPost = await this.trainingPostService.createTraining(dto);
    return fillDto(TrainingRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingResponse.TrainingDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.TrainingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingResponse.AccessDeny,
  })
  @Delete('/:trainingId/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('training post')
  public async destroy(@Param('trainingId') trainingId: number) {
    await this.trainingPostService.deleteTraining(trainingId);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.TrainingUpdated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.TrainingNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingResponse.AccessDeny,
  })
  @Patch('/:id')
  @ApiTags('training post')
  public async update(@Param('id') id: number, @Body() dto: UpdateTrainingDto) {
    const updatedPost = await this.trainingPostService.updateTraining(id, dto);
    return fillDto(TrainingRdo, updatedPost.toPOJO());
  }

  @Post('sendNewPostNotify')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('training post')
  public async sendNewPostNotify(@Body() dto: UserIdDto) {
    const query = new TrainingQuery();
    query.userId = dto.userId;
    query.sortBy = SortType.DATE;
    query.sortDirection = SortDirection.Desc;
    const { entities } = await this.trainingPostService.getTrainings(query);

    this.notifyService.sendNewPostNotify(
      entities.map((training) => training.toPOJO()),
      dto.userId
    );
  }
}
