import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Project } from './entities/project.entity';
import { PaginationDto } from '../db/dto/pagination.dto';
import { Task } from '../task/entities/task.entity';
import { User } from '../auth/user/entities/user.entity';
import { AssignProjectDto, CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.projectModel.create(createProjectDto);
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async findAll(params: PaginationDto): Promise<Project[]> {
    const { limit = 10, skip = 0 } = params;
    return await this.projectModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ status: 1 })
      .select('-__v')
      .populate('assignTo', 'name')
      .populate('comments', '-__v -createdAt -updatedAt')
      .exec( );
  }

  async findOneById(id: string): Promise<Project> {
    return await this.projectModel.findById(id)
      .populate('assignTo', 'name')
      .exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async delete(id: string) {
    const project =  await this.projectModel.findByIdAndDelete(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async findByUserAndStatus(userId: string, status: string, params: PaginationDto): Promise<Task[]> {
    const { limit = 10, skip = 0 } = params;

    return await this.projectModel.find({ assignTo: userId, status: status })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async assignProject(id: string, assignProject: AssignProjectDto): Promise<Project> {
    const { userId } = assignProject;
    const project = await this.findOneById(id);
    if (!project) {
      throw new NotFoundException(`Project with id ${userId} not found`);
    }
    const user: User = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    project.assignTo = user.id;
    return project.save();
  }
}
