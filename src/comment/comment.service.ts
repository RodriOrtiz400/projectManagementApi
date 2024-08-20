import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from '../task/entities/task.entity';
import { Project } from '../project/entities/project.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationDto } from '../db/dto/pagination.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { text, taskId, projectId, userId } = createCommentDto;

    if (!taskId && !projectId) {
      throw new NotFoundException('Task or Project ID must be provided');
    }

    if (taskId) {
      const task = await this.taskModel.findById(taskId);
      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }
    }

    if (projectId) {
      const project = await this.projectModel.findById(projectId);
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }
    }

    const newComment = new this.commentModel({
      text,
      task: taskId || null,
      project: projectId || null,
      createdBy: userId,
    });

    await newComment.save();

    const model = taskId ? this.taskModel : this.projectModel;
    const id = taskId || projectId;

    await model.findByIdAndUpdate(id, {
      $push: { comments: newComment.id }
    });

    return newComment;
  }

  async findAll(params: PaginationDto): Promise<Comment[]> {
    const { limit = 10, skip = 0 } = params;
    return await this.commentModel.find()
      .limit(limit)
      .skip(skip)
      .select('-__v')
      .populate('createdBy')
      .populate('task')
      .populate('project')
      .exec();
  }
}
