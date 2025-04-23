import { RequestWithTokenPayload } from '@backend/authentication';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import {
  CreateOrderDto,
  TrainingOrderQuery,
  TrainingOrderRdo,
  TrainingOrderResponse,
  TrainingOrderWithPaginationRdo,
  UpdateOrderStateDto,
} from '@backend/training-order';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
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

@Controller('orders')
@UseFilters(AxiosExceptionFilter)
export class OrderController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @ApiResponse({
    type: TrainingOrderWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingOrderResponse.OrdersFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.TrainingNotFound,
  })
  @ApiQuery({ type: TrainingOrderQuery })
  @Get('/')
  @ApiTags(ApiSection.Order)
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  public async getOrders(@Req() req: RequestWithTokenPayload & Request) {
    const userId = req.user.sub;
    const role = req.user.role;

    const requestUrl = `${req.url}&userId=${userId}&role=${role}`;
    const query = url.parse(requestUrl).query;

    const { data } =
      await this.httpService.axiosRef.get<TrainingOrderWithPaginationRdo>(
        `${ApplicationServiceURL.Orders}?${query}`
      );

    await this.appService.appendTrainingInfo(userId, data.entities);

    return data;
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: TrainingOrderResponse.OrdersFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.TrainingNotFound,
  })
  @Get('/:trainingId')
  @ApiTags(ApiSection.Order)
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  public async getOrder(
    @Param('trainingId') trainingId: number,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    const { data } = await this.httpService.axiosRef.get<TrainingOrderRdo>(
      `${ApplicationServiceURL.Orders}/${userId}/${trainingId}`
    );

    return data;
  }

  @Put('/:trainingId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: TrainingOrderResponse.OrdersFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.TrainingNotFound,
  })
  @ApiTags(ApiSection.Order)
  public async updateTrainingState(
    @Param('trainingId') trainingId: number,
    @Body() dto: UpdateOrderStateDto
  ) {
    const { data } = await this.httpService.axiosRef.put<TrainingOrderRdo>(
      `${ApplicationServiceURL.Orders}/${trainingId}`,
      dto
    );
    await this.appService.appendTrainingInfo(dto.userId, [data]);

    return data;
  }

  @Post('/:trainingId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.CREATED,
    description: TrainingOrderResponse.OrderCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.TrainingNotFound,
  })
  @ApiTags(ApiSection.Order)
  public async createOrder(
    @Param('trainingId') trainingId: number,
    @Body() dto: CreateOrderDto
  ) {
    const { data } = await this.httpService.axiosRef.post<TrainingOrderRdo>(
      `${ApplicationServiceURL.Orders}/${trainingId}`,
      dto
    );
    await this.appService.appendTrainingInfo(dto.userId, [data]);

    return data;
  }

  @Delete('/:orderId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingOrderResponse.OrderDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.OrderNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingOrderResponse.NotAllowed,
  })
  @ApiTags(ApiSection.Order)
  public async deleteOrder(
    @Param('orderId') orderId: number,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Orders}/${orderId}/${userId}`
    );
  }
}
