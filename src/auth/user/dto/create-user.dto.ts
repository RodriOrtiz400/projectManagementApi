import { IsNotEmpty, IsString, MinLength, IsEmail, IsEnum } from 'class-validator';

import { Role } from '../../interface/role';

export class CreateUserDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(Role,
    {
      message: 'Role must be one of the following: project_manager, team_lead, developer',
    })
  role: string;
}
