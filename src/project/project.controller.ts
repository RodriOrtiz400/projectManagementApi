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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';

import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto, AssignProjectDto } from './dto';
import { PaginationDto } from '../db/dto/pagination.dto';
import { Project } from './entities/project.entity';
import { Role } from '../auth/interface/role';
import { Auth } from '../auth/decorators';

@ApiTags('project')
@ApiExtraModels(CreateProjectDto)
@ApiExtraModels(UpdateProjectDto)
@ApiExtraModels(AssignProjectDto)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiBody({ schema: { $ref: getSchemaPath(CreateProjectDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateProjectDto) },
  })
  @ApiResponse({
    status: 403,
    description:
      'Role allowed: "Project Manager". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.ProjectManager)
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiQuery({ schema: { $ref: getSchemaPath(PaginationDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      items: { $ref: getSchemaPath(CreateProjectDto) },
      type: 'array',
    },
  })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: PaginationDto): Promise<Project[]> {
    return this.projectService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the project',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateProjectDto) },
  })
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string) {
    return this.projectService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the project',
    required: true,
  })
  @ApiBody({ schema: { $ref: getSchemaPath(UpdateProjectDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateProjectDto) },
  })
  @ApiResponse({
    status: 403,
    description:
      'Roles allowed: "Project Manager", "Team Leader", "Developer". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Developer, Role.ProjectManager, Role.TeamLeader)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the project',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateProjectDto) },
  })
  @ApiResponse({
    status: 403,
    description:
      'Roles allowed: "Project Manager", "Team Leader". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.ProjectManager)
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  @Get(':userId/status/:status')
  @ApiOperation({
    summary: 'Get all projects assigned to a user with an specific status',
  })
  @ApiQuery({
    schema: { $ref: getSchemaPath(PaginationDto) },
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
      items: { $ref: getSchemaPath(CreateProjectDto) },
      type: 'array',
    },
  })
  findByUserAndStatus(
    @Query() params: PaginationDto,
    @Param('userId') userId: string,
    @Param('status') status: string,
  ) {
    return this.projectService.findByUserAndStatus(userId, status, params);
  }

  @Put(':id/assign')
  @ApiOperation({ summary: 'Assign a project to a user' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the project',
    required: true,
  })
  @ApiBody({ schema: { $ref: getSchemaPath(AssignProjectDto) } })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { $ref: getSchemaPath(CreateProjectDto) },
  })
  @ApiResponse({
    status: 403,
    description:
      'Roles allowed: "Project Manager", "Team Leader", "Developer". Your user does not have permissions to perform this action.',
  })
  @ApiBearerAuth('access_token')
  @Auth(Role.ProjectManager)
  assignProject(
    @Param('id') id: string,
    @Body() assignProject: AssignProjectDto,
  ) {
    return this.projectService.assignProject(id, assignProject);
  }
}
