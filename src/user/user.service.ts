import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './schemas/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUid(_id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { _id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userData: {
    _id: string;
    email: string | undefined;
    name: string | undefined;
    photoURL: string;
  }) {
    return this.userRepository.save(userData);
  }

  async updateUser(_id: string, updateData: Partial<User>) {
    return this.userRepository.update(_id, updateData);
  }
}
