import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignProjectDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @ApiProperty({ example: 'User Id' })
  userId: string;
}
