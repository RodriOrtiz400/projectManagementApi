import { Injectable } from '@nestjs/common';
import { address } from 'ip';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HealthCheck } from './interfaces';
import { Task } from './task/entities/task.entity';
import { Project } from './project/entities/project.entity';
import { User } from './auth/user/entities/user.entity';
import { initialProjects, initialTasks } from './db/initial-data';
import { initialUsers } from './db/initial-data/initial-users';
import { PasswordHelper } from './auth/helper/password.helper';

@Injectable()
export class AppService {
  constructor(
    // Everything in this constructor it's just to use the setInitialData function to have valid data to interact.
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private passwordHelper: PasswordHelper,
  ) {}

  getHealthCheck(): HealthCheck {
    return {
      project: 'Project-Management-Challenge-API',
      hostaddress: address(),
      processid: process.pid,
    } as HealthCheck;
  }

  async setInitialData(): Promise<string> {
    try {
      await Promise.all([
        this.taskModel.deleteMany({}),
        this.projectModel.deleteMany({}),
        this.userModel.deleteMany({}),
      ]);

      const usersWithHashedPasswords = await Promise.all(
        initialUsers.map(async (user) => {
          user.password = await this.preparePass(user.password);
          return user;
        }),
      );

      await Promise.all([
        this.taskModel.insertMany(initialTasks),
        this.projectModel.insertMany(initialProjects),
        this.userModel.insertMany(usersWithHashedPasswords),
      ]);

      return 'Data has been created successfully.';
    } catch (error) {
      throw new Error('Failed to set initial data.');
    }
  }

  private async preparePass(password: string): Promise<string> {
    return this.passwordHelper.hashData(password);
  }
}
