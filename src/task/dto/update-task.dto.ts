import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../interfaces';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @MinLength(3)
  @ApiPropertyOptional({ example: 'Some Title' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Some Description' })
  description?: string;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({ example: '2024-12-01' })
  due_date?: Date;

  @IsString()
  @IsEnum(Status,
    {
      message: 'Status must be one of the following: not_started, in_progress, completed',
    })
  @ApiPropertyOptional({ example: 'not_started, in_progress, completed' })
  status: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiPropertyOptional({ example: 'User Id' })
  assignTo: string;
}
