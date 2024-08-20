import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //   MongooseModule.forRoot('mongodb://db:27017/challenge'), // Poner en una ENV
    MongooseModule.forRoot('mongodb://localhost:27017/challenge'), // TODO move to ENV var and implement forRootAsync
    ProjectModule,
    TaskModule,
    CommentModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
