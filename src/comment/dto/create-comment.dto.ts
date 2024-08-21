import {
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  taskId?: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  projectId?: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;
}
