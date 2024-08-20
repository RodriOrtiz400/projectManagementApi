import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './entities/task.entity';
import { PaginationDto } from '../db/dto/pagination.dto';
import { AssignTaskDto, CreateTaskDto, UpdateTaskDto } from './dto';
import { User } from '../auth/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskModel.create(createTaskDto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async findAll(params: PaginationDto): Promise<Task[]> {
    const { limit = 10, skip = 0 } = params;
    return await this.taskModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ status: 1 })
      .select('-__v')
      .populate('assignTo', 'name')
      .populate('comments', '-__v -createdAt -updatedAt')
      .exec();
  }

  async findOneById(id: string): Promise<Task> {
    return await this.taskModel.findById(id)
      .populate('assignTo', 'name')
      .exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async delete(id: string): Promise<Task> {
    const task =  await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async findByUserAndStatus(userId: string, status: string, params: PaginationDto): Promise<Task[]> {
    const { limit = 10, skip = 0 } = params;

    return await this.taskModel.find({ assignTo: userId, status })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async assignTask(id: string, assignTask: AssignTaskDto): Promise<Task> {
    const { userId } = assignTask;
    const task = await this.findOneById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${userId} not found`);
    }
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    task.assignTo = user.id;
    return task.save();
  }
}
