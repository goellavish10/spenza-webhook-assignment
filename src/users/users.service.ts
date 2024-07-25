import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByUserName(username: string) {
    return this.userModel.findOne({ username: username });
  }

  async create(user: User) {
    return await this.userModel.create(user);
  }
}
