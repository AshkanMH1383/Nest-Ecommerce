import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserLogin extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  user_agent: string;

  @Prop({ required: true })
  date_added: string;
}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);
