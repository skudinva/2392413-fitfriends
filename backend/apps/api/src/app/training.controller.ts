import {
  RequestWithTokenPayload,
  RequestWithTokenPayloadUrl,
} from '@backend/authentication';
import { createStaticUrlForFile } from '@backend/helpers';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import { EntityConstrain } from '@backend/shared/core';
import {
  CreateTrainingDto,
  TrainingQuery,
  TrainingRdo,
  TrainingResponse,
  TrainingWithPaginationRdo,
  UpdateTrainingDto,
} from '@backend/training';
import {
  CreateCommentDto,
  TrainingCommentQuery,
  TrainingCommentRdo,
  TrainingCommentResponse,
  TrainingCommentWithPaginationRdo,
} from '@backend/training-comment';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import 'multer';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthForceGuard } from './guards/check-auth-force.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('trainings')
@UseFilters(AxiosExceptionFilter)
export class TrainingController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('video'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: TrainingResponse.TrainingFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.TrainingNotFound,
  })
  @Post('/')
  @ApiTags(ApiSection.Training)
  public async createTraining(
    @Body() dto: CreateTrainingDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: EntityConstrain.training.video.mimeTypes,
          }),
        ],
        fileIsRequired: true,
      })
    )
    file?: Express.Multer.File
  ) {
    const trainingDto = plainToInstance(
      CreateTrainingDto,
      { ...dto },
      { enableImplicitConversion: true }
    );

    if (file) {
      trainingDto.video = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.post<TrainingRdo>(
      `${ApplicationServiceURL.Training}/`,
      trainingDto
    );

    data.video = createStaticUrlForFile(data.video, ApplicationServiceURL.File);

    return data;
  }

  @Patch('/:id')
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
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiTags(ApiSection.Training)
  public async updateTraining(
    @Param('id') id: number,
    @Body() dto: UpdateTrainingDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: EntityConstrain.training.video.mimeTypes,
          }),
        ],
        fileIsRequired: true,
      })
    )
    file?: Express.Multer.File
  ) {
    const trainingDto = plainToInstance(UpdateTrainingDto, dto);

    if (file) {
      trainingDto.video = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.patch<TrainingRdo>(
      `${ApplicationServiceURL.Training}/${id}`,
      trainingDto
    );

    data.video = createStaticUrlForFile(data.video, ApplicationServiceURL.File);

    return data;
  }

  @Delete('/:id')
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiTags(ApiSection.Training)
  public async deleteTraining(
    @Param('id') id: number,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Training}/${id}/${userId}`
    );
  }

  @ApiResponse({
    type: TrainingWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.TrainingsFound,
  })
  @ApiQuery({ type: TrainingQuery })
  @Get('/')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthForceGuard)
  @ApiTags(ApiSection.Training)
  public async getTrainings(@Req() req: RequestWithTokenPayloadUrl) {
    const userId = req.user?.sub;
    const requestUrl = userId ? `${req.url}&userId=${userId}` : req.url;
    const query = url.parse(requestUrl).query;

    const { data } =
      await this.httpService.axiosRef.get<TrainingWithPaginationRdo>(
        `${ApplicationServiceURL.Training}?${query}`
      );

    data.entities.map((training) => {
      training.video = createStaticUrlForFile(
        training.video,
        ApplicationServiceURL.File
      );
    });

    await this.appService.appendUserInfo(data.entities);
    return data;
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.TrainingFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.TrainingNotFound,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthForceGuard)
  @Get('/:id')
  @ApiTags(ApiSection.Training)
  public async getTraining(
    @Param('id') id: number,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user?.sub;
    const { data } = await this.httpService.axiosRef.get<TrainingRdo>(
      `${ApplicationServiceURL.Training}/${id}/${userId}`
    );

    data.video = createStaticUrlForFile(data.video, ApplicationServiceURL.File);
    await this.appService.appendUserInfo([data]);
    return data;
  }

  @ApiResponse({
    type: TrainingCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingCommentResponse.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.TrainingNotFound,
  })
  @ApiQuery({ type: TrainingCommentQuery })
  @Get('/comments/:trainingId')
  @ApiTags(ApiSection.Comment)
  public async getComments(
    @Param('trainingId') trainingId: number,
    @Req() req: Request
  ) {
    const { data } =
      await this.httpService.axiosRef.get<TrainingCommentWithPaginationRdo>(
        `${ApplicationServiceURL.Comments}/${trainingId}?${
          url.parse(req.url).query
        }`
      );
    await this.appService.appendUserInfo(data.entities);
    return data;
  }

  @Post('/comments/:trainingId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: TrainingCommentRdo,
    status: HttpStatus.CREATED,
    description: TrainingCommentResponse.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.TrainingNotFound,
  })
  @ApiTags(ApiSection.Comment)
  public async createComment(
    @Param('trainingId') trainingId: number,
    @Body() dto: CreateCommentDto
  ) {
    const { data } = await this.httpService.axiosRef.post<TrainingCommentRdo>(
      `${ApplicationServiceURL.Comments}/${trainingId}`,
      dto
    );
    await this.appService.appendUserInfo([data]);
    return data;
  }

  @Delete('/comments/:commentId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingCommentResponse.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingCommentResponse.NotAllowed,
  })
  @ApiTags(ApiSection.Comment)
  public async deleteComment(
    @Param('commentId') commentId: number,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Comments}/${commentId}/${userId}`
    );
  }
}
