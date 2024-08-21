import { IsNotEmpty, IsString, MinLength, IsEmail, IsEnum } from 'class-validator';

import { Role } from '../../interface/role';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'jhon@challenge.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'project_manager' })
  @IsString()
  @IsEnum(Role,
    {
      message: 'Role must be one of the following: project_manager, team_lead, developer',
    })
  role: string;
}
