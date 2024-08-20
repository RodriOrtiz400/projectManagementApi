import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;
}