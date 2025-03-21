import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUid(_id: string): Promise<User | null> {
    return this.userModel.findOne({ _id }).exec();
  }

  async createUser(userData: {
    _id: string;
    email: string | undefined;
    name: string | undefined;
    photoURL: string;
  }) {
    return this.userModel.create(userData);
  }

  async updateUser(_id: string, updateData: Partial<User>) {
    return this.userModel.findOneAndUpdate({ _id }, updateData, { new: true });
  }
}
