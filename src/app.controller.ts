import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist/decorators';

import { AppService } from './app.service';
import { HealthCheck } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  @ApiOperation({ summary: 'Give info about the API' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      example: {
        project: 'string',
        hostaddress: 'string',
        processid: 'number',
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
    schema: {
      example: {
        text: 'Data has been created successfully.',
      },
      type: 'JSON',
    },
  })
  @HttpCode(HttpStatus.OK)
  setInitialData() {
    return this.appService.setInitialData();
  }
}
