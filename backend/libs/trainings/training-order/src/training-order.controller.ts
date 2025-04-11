import { fillDto } from '@backend/helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { TrainingOrderWithPaginationRdo } from './rdo/training-order-with-pagination';
import { TrainingOrderRdo } from './rdo/training-order.rdo';
import { TrainingOrderResponse } from './training-order.constant';
import { TrainingOrderQuery } from './training-order.query';
import { TrainingOrderService } from './training-order.service';

@ApiTags('training order')
@Controller('orders')
export class TrainingOrderController {
  constructor(private readonly trainingOrderService: TrainingOrderService) {}

  @ApiResponse({
    type: TrainingOrderWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingOrderResponse.OrdersFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.TrainingNotFound,
  })
  @Get('/:userId')
  public async show(
    @Param('userId') userId: string,
    @Query() query: TrainingOrderQuery
  ) {
    const orders = await this.trainingOrderService.getOrders(userId, query);
    return fillDto(TrainingOrderWithPaginationRdo, orders);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.CREATED,
    description: TrainingOrderResponse.OrderCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingOrderResponse.TrainingNotFound,
  })
  @Post('/:trainingId')
  public async create(
    @Param('trainingId') trainingId: number,
    @Body() dto: CreateOrderDto
  ) {
    const newOrder = await this.trainingOrderService.addOrder(trainingId, dto);
    return fillDto(TrainingOrderRdo, newOrder.toPOJO());
  }

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
  @Delete('/:orderId/:userId')
  public async delete(
    @Param('orderId') orderId: number,
    @Param('userId') userId: string
  ) {
    await this.trainingOrderService.deleteOrder(orderId, userId);
  }
}
