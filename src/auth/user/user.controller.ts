import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { PaginationDto } from '../../db/dto/pagination.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiExtraModels, ApiOperation, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateUserDto } from './dto';

@ApiTags('user')
@ApiExtraModels(CreateUserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({
    schema:{
      $ref: getSchemaPath(PaginationDto)
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'array',
      items: {
          $ref: getSchemaPath(CreateUserDto),
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() params: PaginationDto,
  ): Promise<User[]> {
    return this.userService.findAll(params);
  }
}
