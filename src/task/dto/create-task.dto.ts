import { IsDate, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import { Status } from '../../interfaces';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'Some Title' })
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
  @ApiProperty({ example: 'not_started, in_progress, completed' })
  status: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiPropertyOptional({ example: 'User Id' })
  assignTo: string;
}
