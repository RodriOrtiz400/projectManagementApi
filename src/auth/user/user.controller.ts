import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { PaginationDto } from '../../db/dto/pagination.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('user')
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
      items: { $ref: getSchemaPath(User) },
      type: 'array',
    },
  })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() params: PaginationDto,
  ): Promise<User[]> {
    return this.userService.findAll(params);
  }
}
