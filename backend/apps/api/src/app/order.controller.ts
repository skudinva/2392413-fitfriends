import { RequestWithTokenPayload } from '@backend/authentication';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import {
  CreateOrderDto,
  TrainingOrderQuery,
  TrainingOrderRdo,
  TrainingOrderResponse,
  TrainingOrderWithPaginationRdo,
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
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('orders')
@UseFilters(AxiosExceptionFilter)
export class OrderController {
  constructor(private readonly httpService: HttpService) {}

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
  public async getOrders(
    @Req() reqToken: RequestWithTokenPayload,
    @Req() req: Request
  ) {
    const userId = reqToken.user.sub;
    const { data } =
      await this.httpService.axiosRef.get<TrainingOrderWithPaginationRdo>(
        `${ApplicationServiceURL.Orders}/${userId}?${url.parse(req.url).query}`
      );

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
