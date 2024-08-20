import { IsDate, IsEnum, IsMongoId, IsOptional, IsString, MinLength } from 'class-validator';
import { Status } from '../../interfaces';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  due_date?: Date;

  @IsString()
  @IsEnum(Status,
    {
      message: 'Status must be one of the following: not_started, in_progress, completed',
    })
  status: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  assignTo: string;
}
