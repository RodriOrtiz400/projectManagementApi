import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './entities/task.entity';
import { User, UserSchema } from '../auth/user/entities/user.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [
    MongooseModule,
  ],
})
export class TaskModule {}
