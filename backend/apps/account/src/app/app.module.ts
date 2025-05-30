import { AuthenticationModule } from '@backend/authentication';
import { AccountConfigModule, getMongooseOptions } from '@backend/config';
import { FriendModule } from '@backend/friend';
import { ShopUserModule } from '@backend/shop-user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ShopUserModule,
    AuthenticationModule,
    AccountConfigModule,
    FriendModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
