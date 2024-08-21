import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'jhon@challenge.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pass123+' })
  password: string;
}
