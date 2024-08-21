import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';

import { AuthService } from './auth.service';
import { CreateUserDto, CredentialsDto } from '../user/dto';
import { EmailLoggerService } from '../../email/email-logger/email-logger.service';
import { UserCreated } from '../user/interface/user-created.interface';
import { ApiExtraModels, getSchemaPath } from '@nestjs/swagger';

@ApiTags('auth')
@ApiExtraModels(CredentialsDto)
@ApiExtraModels(CreateUserDto)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailLoggerService,
    ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ schema: { $ref: getSchemaPath(CredentialsDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        access_token: 'string',
      },
      type: 'JSON',
    },
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() credentials: CredentialsDto): Promise<any> {
    return this.authService.login(credentials);
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ schema: { $ref: getSchemaPath(CreateUserDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateUserDto) }
  })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async create(@Body() user: CreateUserDto): Promise<UserCreated> {
    const newUser = await this.authService.create(user);
    // await this.emailService.sendNotificationEmail({
    //   name: newUser.name,
    //   email: newUser.email,
    //   role: newUser.role,
    //   action: 'User Created Successfully',
    //   }
    // );
    return newUser;
  }
}
