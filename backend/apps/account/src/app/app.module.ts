import { AuthenticationModule } from '@backend/authentication';
import { AccountConfigModule, getMongooseOptions } from '@backend/config';
import { ShopUserModule } from '@backend/shop-user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ShopUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
