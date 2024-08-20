import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
