import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist/decorators';

import { AppService } from './app.service';
import { HealthCheck } from './interfaces';
import { ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from './db/dto/pagination.dto';
import { Task } from './task/entities/task.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Endpoint To check if Project Management API is working',
  })
  @ApiResponse({
    status: 200,
    description:
      'Return object with the ip of the host and process id and the project name ',
  })
  @Get('/health-check')
  @ApiOperation({ summary: 'Give info about the API' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        project: "string",
        hostaddress: "string",
        processid: "number",
      },
      type: 'JSON',
    },
  })
  @HttpCode(HttpStatus.OK)
  getHealthCheck(): HealthCheck {
    return this.appService.getHealthCheck();
  }

  @Get('/set-initial-data')
  @ApiOperation({ summary: 'Set the initial data in DB' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: { title: 'Data has been created successfully.' },
  })
  @HttpCode(HttpStatus.OK)
  setInitialData() {
    return this.appService.setInitialData();
  }
}
