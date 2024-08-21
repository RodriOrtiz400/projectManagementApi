import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger/dist/decorators';

import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto, AssignTaskDto } from './dto';
import { Task } from './entities/task.entity';
import { PaginationDto } from '../db/dto/pagination.dto';
import { Auth } from '../auth/decorators';
import { Role } from '../auth/interface/role';
import { ApiBearerAuth, ApiExtraModels, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('task')
@ApiExtraModels(CreateTaskDto)
@ApiExtraModels(UpdateTaskDto)
@ApiExtraModels(AssignTaskDto)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiBody({ schema: { $ref: getSchemaPath(CreateTaskDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateTaskDto) } })
  @ApiResponse({
    status: 403,
    description: 'Role allowed: "Project Manager". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.ProjectManager)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ schema:{ $ref: getSchemaPath(PaginationDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      items: { $ref: getSchemaPath(CreateTaskDto) },
      type: 'array',
    },
  })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() params: PaginationDto,
  ): Promise<Task[]> {
    return this.taskService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateTaskDto) } })
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.taskService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task',
    required: true,
  })
  @ApiBody({ schema: { $ref: getSchemaPath(UpdateTaskDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateTaskDto) }
  })
  @ApiResponse({
    status: 403,
    description: 'Roles allowed: "Project Manager", "Team Leader", "Developer". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Developer, Role.ProjectManager, Role.TeamLeader)
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateTaskDto) }
  })
  @ApiResponse({
    status: 403,
    description: 'Roles allowed: "Project Manager", "Team Leader". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.ProjectManager, Role.TeamLeader)
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @Get(':userId/status/:status')
  @ApiOperation({ summary: 'Get all tasks assigned to a user with an specific status' })
  @ApiQuery({
    schema:{ $ref: getSchemaPath(PaginationDto) }
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'The unique identifier of the user',
    required: true,
  })
  @ApiParam({
    name: 'status',
    type: 'string',
    description: 'The name of the status',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      items: { $ref: getSchemaPath(CreateTaskDto) },
      type: 'array',
    },
  })
  findByUserAndStatus(
    @Query() params: PaginationDto,
    @Param('userId') userId: string,
    @Param('status') status: string
  ): Promise<Task[]>  {
    return this.taskService.findByUserAndStatus(userId, status, params);
  }

  @Put(':id/assign')
  @ApiOperation({ summary: 'Assign a task to a user' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task',
    required: true,
  })
  @ApiBody({ schema: { $ref: getSchemaPath(AssignTaskDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema:  { $ref: getSchemaPath(CreateTaskDto) }
  })
  @ApiResponse({
    status: 403,
    description: 'Roles allowed: "Project Manager", "Team Leader", "Developer". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @Auth(Role.Developer, Role.ProjectManager, Role.TeamLeader)
  async assignTask(@Param('id') id: string, @Body() assignTask: AssignTaskDto): Promise<Task> {
    return this.taskService.assignTask(id, assignTask);
  }
}
