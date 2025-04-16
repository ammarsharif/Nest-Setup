import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export interface RequestWithUser extends Request {
  user: UserDocument;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  id: string;
  
    @Prop({ required: true })
    name: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  photoURL: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  location: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
