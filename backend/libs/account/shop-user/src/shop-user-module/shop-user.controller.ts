import { fillDto } from '@backend/helpers';
import { MongoIdValidationPipe } from '@backend/pipes';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRdo } from './rdo/user.rdo';
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
}
