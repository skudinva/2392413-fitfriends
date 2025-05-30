import { Friend } from '@backend/shared/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema({
  collection: 'friends',
  timestamps: true,
})
export class FriendModel extends Document implements Friend {
  @Prop({
    required: true,
  })
  public userId!: string;

  @Prop({
    required: true,
  })
  public friendId!: string;

  @Prop({ default: now })
  public createdAt!: Date;
}

export const FriendsSchema = SchemaFactory.createForClass(FriendModel);
