import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export interface RequestWithUser extends Request {
  user: UserDocument;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  photoURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
