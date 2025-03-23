import {
  AuthUser,
  LocationName,
  UserGender,
  UserRole,
} from '@backend/shared/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class ShopUserModel extends Document implements AuthUser {
  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public name!: string;

  @Prop({
    required: false,
  })
  public avatar?: string;

  @Prop({
    required: true,
    type: String,
  })
  public gender!: UserGender;

  @Prop({
    required: false,
  })
  public birthday?: Date;

  @Prop({
    required: false,
  })
  public description?: string;

  @Prop({
    required: true,
    type: String,
  })
  public location!: LocationName;

  @Prop({
    required: true,
  })
  public registerDate!: Date;

  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Prop({
    required: true,
    type: String,
  })
  public role!: UserRole;
}

export const ShopUserSchema = SchemaFactory.createForClass(ShopUserModel);
