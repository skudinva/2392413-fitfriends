import { fillDto } from '@backend/helpers';
import { MongoIdValidationPipe } from '@backend/pipes';
import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWithPaginationRdo } from './rdo/user-with-pagination.rdo';
import { UserRdo } from './rdo/user.rdo';
import { ShopUserQuery } from './shop-user.query';
import { ShopUserService } from './shop-user.service';

@Controller('user')
@ApiTags('shop-user')
export class ShopUserController {
  constructor(private readonly userService: ShopUserService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.userService.getUserInfo(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Get('/')
  @ApiResponse({
    type: UserWithPaginationRdo,
    status: HttpStatus.OK,
  })
  public async index(@Query() query: ShopUserQuery) {
    const usersWithPagination = await this.userService.getUsers(query);
    const result = {
      ...usersWithPagination,
      entities: usersWithPagination.entities.map((user) => user.toPOJO()),
    };
    return fillDto(UserWithPaginationRdo, result);
  }
}
