import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Auth } from '../auth/decorators';
import { Role } from '../auth/interface/role';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from '../db/dto/pagination.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a comment in a Task or Project' })
  @ApiBody({
    schema: {
      example: {
        text: 'string',
        taskId: 'string',
        projectId: 'string',
        userId: 'string',
      },
      type: 'JSON',
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        text: 'string',
        taskId: 'string',
        projectId: 'string',
        userId: 'string',
      },
      type: 'JSON',
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Role allowed: "Project Manager", "Team Leader", "Developer". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @Auth(Role.Developer, Role.ProjectManager, Role.TeamLeader)
  async addComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentService.addComment(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiQuery({
    required: false,
    schema: { $ref: getSchemaPath(PaginationDto) },
  })
  @ApiBearerAuth('access_token')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      items: {
        example: {
          text: 'string',
          task: 'string',
          project: 'string',
          createdBy: 'string',
        },
      },
      type: 'array',
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Role allowed: "Project Manager", "Team Leader", "Developer". Your user does not have permissions to perform this action.',
  })
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Developer, Role.ProjectManager, Role.TeamLeader)
  async findAll(@Query() params: PaginationDto): Promise<Comment[]> {
    return this.commentService.findAll(params);
  }
}
