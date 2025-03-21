import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }
  // We use the exec() method to execute the query and return a promise. because the findOne() method returns a Query object, not a promise. we use it with other methods also like find(), findById(), etc.
  // The lean() method is used to convert the mongoose document into a plain JavaScript object. This method is used to improve the performance of the query. It is used when you don't want to modify the document before sending it to the client. 

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
