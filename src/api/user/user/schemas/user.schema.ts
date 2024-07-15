import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EUserStatus } from '../enums/user_status.enum';

@Schema()
export class User extends Document{
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  mobile: string;

  @Prop({ required: false })
  image: string;

  @Prop({ default: EUserStatus.DISABLED  })
  status: EUserStatus;

  @Prop({ default: [] })
  roles: string[];

  @Prop({ default: [] })
  groups: string[];

  @Prop({ default: '' })
  token: string;

  @Prop({ default: 0 })
  failed_login_attemps: number;

  @Prop({ required: true })
  date_added: string;

  @Prop({ default: Date.now().toString() })
  date_modified: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
