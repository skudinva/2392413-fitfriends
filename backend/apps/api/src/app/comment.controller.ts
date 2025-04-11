import { RequestWithTokenPayload } from '@backend/authentication';
import { InjectUserIdInterceptor } from '@backend/interceptors';
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
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('trainings')
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

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
