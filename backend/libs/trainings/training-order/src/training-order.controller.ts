import { fillDto } from '@backend/helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';
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
  @Get('/')
  public async show(@Query() query: TrainingOrderQuery) {
    const orders = await this.trainingOrderService.getOrders(query);
    return fillDto(TrainingOrderWithPaginationRdo, orders);
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
  @Get('/:userId/:trainingId')
  public async getTrainingOrder(
    @Param('userId') userId: string,
    @Param('trainingId') trainingId: number
  ) {
    const order = await this.trainingOrderService.findActiveOrderByTrainingId(
      trainingId,
      userId
    );

    return fillDto(TrainingOrderRdo, order);
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
  @Put('/:trainingId')
  public async updateTrainingState(
    @Param('trainingId') trainingId: number,
    @Body() dto: UpdateOrderStateDto
  ) {
    const order = await this.trainingOrderService.updateTrainingState(
      trainingId,
      dto
    );

    return fillDto(TrainingOrderRdo, order.toPOJO());
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
