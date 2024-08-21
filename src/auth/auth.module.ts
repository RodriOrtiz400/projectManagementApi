import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { Task, TaskSchema } from '../task/entities/task.entity';
import { PasswordHelper } from './helper/password.helper';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailLoggerService } from '../email/email-logger/email-logger.service';

@Module({
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    PasswordHelper,
    JwtStrategy,
    EmailLoggerService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
  ],
  exports: [
    MongooseModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    PasswordHelper,
  ],
})
export class AuthModule {}
