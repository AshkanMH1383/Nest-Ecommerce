import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserLogin extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  user_agent: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  date_added: string;
}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);
