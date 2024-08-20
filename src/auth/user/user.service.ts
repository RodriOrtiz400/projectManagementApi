import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginationDto } from '../../db/dto/pagination.dto';
import { User } from './entities/user.entity';
import { PasswordHelper } from '../helper/password.helper';
import { CreateUserDto } from './dto';
import { UserCreated } from './interface/user-created.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private passwordHelper: PasswordHelper,
  ) {}

  async findAll(params: PaginationDto): Promise<User[]> {
    const { limit = 10, skip = 0 } = params;
    return await this.userModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ name: 1 })
      .select('-__v')
      .exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(user: CreateUserDto): Promise<any> {
    const userExists = await this.findOneByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const { password, ...userData } = user;

    const hash = await this.passwordHelper.hashData(password);

    try {
      const userCreated: User = await this.userModel.create({
        ...userData,
        password: hash
      });

      const { password, _id, __v, ...shortUserCreated } = userCreated.toObject();

      return shortUserCreated;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
