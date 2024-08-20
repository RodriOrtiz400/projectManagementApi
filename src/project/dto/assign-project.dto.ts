import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AssignProjectDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;
}